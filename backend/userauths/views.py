from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import serializers
from userauths.serializers import UserSerializer, PasswordResetRequestSerializer, SetNewPasswordSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from userauths.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



# Create your views here.
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")

        data = super().validate(attrs)
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer




class RegisterView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """
    API endpoint to fetch the profile of the logged-in user.
    """
    user = request.user
    return Response({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    })


