# parents/serializers.py

from rest_framework import serializers
from userauths.models import User
from .models import Parent
# Importer le sérialiseur de Student sera nécessaire plus tard
from students.serializers import StudentDetailSerializer 

class ParentRegistrationSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour enregistrer un User et créer son profil Parent en une seule fois.
    """
    # On rend le mot de passe obligatoire et en écriture seule.
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'phone')

    def create(self, validated_data):
        # On définit le rôle sur le modèle User avant de le créer
        validated_data['role'] = 'parent'
        # On utilise notre `create_user` pour s'assurer que le mot de passe est bien hashé
        user = User.objects.create_user(**validated_data)
        # On crée l'objet Parent lié à cet utilisateur
        Parent.objects.create(user=user)
        return user

class ParentDetailSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour afficher les détails d'un parent, y compris ses enfants.
    """
    user = serializers.StringRelatedField() # Affiche l'email de l'utilisateur
    # 'children' vient du `related_name` que nous définirons dans le modèle Student.
    children = StudentDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Parent
        fields = ('user', 'engagement_level', 'children')