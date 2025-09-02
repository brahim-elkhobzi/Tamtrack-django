# Fichier : parents/serializers.py

from rest_framework import serializers
from .models import Parent

class ParentRegistrationSerializer(serializers.ModelSerializer):
    # On rend le mot de passe obligatoire et en écriture seule (ne sera jamais renvoyé par l'API)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Parent  # On cible directement le modèle Parent
        fields = ('email', 'password', 'first_name', 'last_name', 'phone', 'engagement_level')
        # Ajoutez les champs que vous voulez rendre obligatoires ou optionnels ici
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }
    
    def create(self, validated_data):
        # On utilise `create_user` qui est hérité du CustomUserManager.
        # Il gère automatiquement le hachage du mot de passe.
        parent = Parent.objects.create_user(**validated_data)
        return parent