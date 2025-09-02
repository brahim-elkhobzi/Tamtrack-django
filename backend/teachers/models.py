# # teachers/models.py

# from django.db import models
# from userauths.models import User
# from students.models import Student

# class Teacher(User):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
#     # Un enseignant peut avoir plusieurs élèves
#     students = models.ManyToManyField(Student, related_name='teachers', blank=True)
#     subject_specialization = models.CharField(max_length=200, blank=True)

#     def __str__(self):
#         return f"Teacher Profile for {self.user.get_full_name()}"
# Fichier : teachers/models.py

from django.db import models
from userauths.models import User
# Utiliser la chaîne de caractères 'students.Student' évite les imports circulaires
# from students.models import Student 

# La classe Teacher HÉRITE de User
class Teacher(User):
    # Champs spécifiques aux professeurs
    subject_specialization = models.CharField(
        max_length=200, 
        blank=True,
        help_text="Matière principale enseignée."
    )
    
    # Relation Many-to-Many pour lier un professeur à plusieurs étudiants
    students = models.ManyToManyField(
        'students.Student', 
        related_name='teachers', 
        blank=True
    )

    def __str__(self):
        return f"Professeur: {self.get_full_name()}"

    class Meta:
        verbose_name = 'Teacher'
        verbose_name_plural = 'Teachers'