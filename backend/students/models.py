

from django.db import models
from userauths.models import User
from parents.models import Parent
# La classe Student HÉRITE de User
class Student(User):
    
    LEVEL_CHOICES = (
        ('tronc commun', 'Tronc Commun'),
        ('premier bac', 'Premier Bac'),
        ('deuxieme bac', 'Deuxième Bac'),
    )
    
    # Champs spécifiques aux étudiants
    level = models.CharField(max_length=50, choices=LEVEL_CHOICES, help_text="Niveau scolaire de l'étudiant")
    points = models.PositiveIntegerField(default=0)
    
    # Lien vers un parent (ForeignKey). Utiliser 'parents.Parent' pour éviter les imports circulaires.
    parent_profile = models.ForeignKey(
        'parents.Parent', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='children'
    )

    # Il n'est pas nécessaire de définir 'objects' ici, il hérite du manager de User.

    def __str__(self):
        return f"Étudiant: {self.get_full_name()}"

    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'