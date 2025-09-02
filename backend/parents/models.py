# # parents/models.py

# from django.db import models
# from userauths.models import User

# class Parent(models.Model):
#     # La relation One-to-One est la clé. Chaque User n'a qu'un seul profil Parent.
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile')
    
#     # Ajoutez ici des champs spécifiques aux parents si nécessaire
#     # Par exemple, pour les notifications du guide.
#     engagement_level = models.CharField(max_length=100, default="standard", blank=True)

#     def __str__(self):
#         # Pour un affichage clair dans l'admin
#         return f"Parent Profile for {self.user.get_full_name()}"
# Fichier : parents/models.py

from django.db import models
from userauths.models import User

# La classe Parent HÉRITE de User
class Parent(User):
    # Vous pouvez ajouter ici des champs spécifiques aux parents
    engagement_level = models.CharField(
        max_length=100, 
        default="standard", 
        help_text="Niveau d'engagement souhaité pour les notifications."
    )

    def __str__(self):
        return f"Parent: {self.get_full_name()}"

    class Meta:
        verbose_name = 'Parent'
        verbose_name_plural = 'Parents'