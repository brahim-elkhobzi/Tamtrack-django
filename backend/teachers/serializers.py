# Fichier : teachers/serializers.py

from rest_framework import serializers
from .models import Teacher

class TeacherRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Teacher # On cible le modèle Teacher
        fields = ('email', 'password', 'first_name', 'last_name', 'subject_specialization')
    
    def create(self, validated_data):
        teacher = Teacher.objects.create_user(**validated_data)
        return teacher