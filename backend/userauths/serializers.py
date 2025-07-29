from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import  User
from django.utils.encoding import smart_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMessage
 


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Cette méthode spéciale est appelée par Simple JWT pour créer le token
        token = super().get_token(user)

        # C'est ici que l'on ajoute nos données personnalisées DANS le token.
        # Le frontend pourra ensuite les décoder.
        token['first_name'] = user.first_name
        token['email'] = user.email
        token['level'] = user.level # <-- LA LIGNE LA PLUS IMPORTANTE !

        return token

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")

        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'level': self.user.level,
        }
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "password", "address", "gender", "phone", "created_at", "level"]
        extra_kwargs = {"password": {"write_only": True}, "id": {"read_only": True}, "created_at": {"read_only": True}}

    def create(self, validated_data):
            if "password" in validated_data:
                password = validated_data.pop("password")
                user = User(**validated_data)
                user.set_password(password)
                user.save()
                return user
            else:
                raise serializers.ValidationError("Password is required")

    def update(self, instance, validated_data):
        if "password" in validated_data:
            instance.set_password(validated_data["password"])
            validated_data.pop("password")

        return super().update(instance, validated_data)


class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'level']
        read_only_fields = ['id', 'email', 'first_name', 'last_name', 'level']


class MiniUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]
        read_only_fields = ['id', 'email', 'first_name', 'last_name']


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist")

        uid = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)

        reset_link = settings.BASE_FRONTEND_URL + f"/reset-password/{uid}/{token}/"

        context = {
            "name": user.first_name + " " + user.last_name,
            "reset_link": reset_link,
            "SITE_URL": settings.BASE_URL,
        }

        html_message = render_to_string('emails/request-reset-password.html', context)
        plain_message = strip_tags(html_message)

        email_message = EmailMessage(
            subject="Password Reset Request",
            body=html_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
        )

        email_message.content_subtype = "html"
        email_message.send()

        return attrs


class SetNewPasswordSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            uid = force_str(urlsafe_base64_decode(attrs["uidb64"]))
            user = User.objects.get(id=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("Invalid UID")

        if not PasswordResetTokenGenerator().check_token(user, attrs["token"]):
            raise serializers.ValidationError("Invalid or expired token")

        user.set_password(attrs["password"])
        user.save()

        return attrs
