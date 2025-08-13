# teachers/models.py

from django.db import models
from userauths.models import User
from students.models import Student

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    # Un enseignant peut avoir plusieurs élèves
    students = models.ManyToManyField(Student, related_name='teachers', blank=True)
    subject_specialization = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"Teacher Profile for {self.user.get_full_name()}"