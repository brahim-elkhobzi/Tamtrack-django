# parents/models.py

from django.db import models
from userauths.models import User

class Parent(models.Model):
    # La relation One-to-One est la clé. Chaque User n'a qu'un seul profil Parent.
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile')
    
    # Ajoutez ici des champs spécifiques aux parents si nécessaire
    # Par exemple, pour les notifications du guide.
    engagement_level = models.CharField(max_length=100, default="standard", blank=True)

    def __str__(self):
        # Pour un affichage clair dans l'admin
        return f"Parent Profile for {self.user.get_full_name()}"