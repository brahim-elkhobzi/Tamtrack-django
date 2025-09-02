# Fichier : students/serializers.py

from rest_framework import serializers
from .models import Student
from parents.models import Parent # On a besoin de chercher le parent

class StudentRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    # On attend l'email du parent, ce qui est plus simple à gérer pour le frontend
    parent_email = serializers.EmailField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = Student # On cible le modèle Student
        # On inclut 'level' et 'parent_email'
        fields = ('email', 'password', 'first_name', 'last_name', 'level', 'parent_email')

    def create(self, validated_data):
        parent_email = validated_data.pop('parent_email', None)
        parent_profile = None

        if parent_email:
            try:
                # On trouve le profil du parent en se basant sur son email
                parent_profile = Parent.objects.get(email=parent_email)
            except Parent.DoesNotExist:
                # Si le parent n'existe pas, on lève une erreur de validation claire
                raise serializers.ValidationError({"parent_email": "Aucun parent trouvé avec cette adresse e-mail."})
        
        # On crée l'objet Student (qui est aussi un User)
        student = Student.objects.create_user(**validated_data)
        
        # Si un parent a été trouvé, on l'associe à l'étudiant
        if parent_profile:
            student.parent_profile = parent_profile
            student.save()
            
        return student