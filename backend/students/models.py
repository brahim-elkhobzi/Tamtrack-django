# students/models.py

from django.db import models
from userauths.models import User
from parents.models import Parent # On importe le modèle Parent

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    # Clé étrangère vers Parent. `related_name='children'` permet d'accéder aux enfants depuis un objet Parent.
    parent = models.ForeignKey(Parent, on_delete=models.SET_NULL, null=True, blank=True, related_name='children')
    
    # Le 'level' (tronc commun, etc) est sur le modèle User.
    # On peut ajouter ici des champs spécifiques à la progression de Tutoring+
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Student Profile for {self.user.get_full_name()}"