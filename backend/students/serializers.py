# students/serializers.py

from rest_framework import serializers
from userauths.models import User
from .models import Student, Parent

class StudentRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # Pour lier un étudiant à un parent, on demande l'email du parent. C'est plus simple pour une API.
    parent_email = serializers.EmailField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'phone', 'level', 'parent_email')

    def create(self, validated_data):
        parent_email = validated_data.pop('parent_email', None)
        parent_profile = None

        if parent_email:
            try:
                # On cherche le profil du parent via son email d'utilisateur
                parent_profile = Parent.objects.get(user__email=parent_email)
            except Parent.DoesNotExist:
                raise serializers.ValidationError("Aucun parent trouvé avec cet email.")
        
        validated_data['role'] = 'student'
        user = User.objects.create_user(**validated_data)
        # On crée l'étudiant, en le liant au profil parent si trouvé
        Student.objects.create(user=user, parent=parent_profile)
        return user


class StudentDetailSerializer(serializers.ModelSerializer):
    """Sert à afficher les détails d'un étudiant."""
    user = serializers.StringRelatedField()
    parent = serializers.StringRelatedField() # Affiche l'email du parent

    class Meta:
        model = Student
        fields = ('user', 'parent', 'points')