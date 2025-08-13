# students/views.py
from rest_framework import generics, permissions
from .serializers import StudentRegistrationSerializer

class StudentRegistrationView(generics.CreateAPIView):
    """Endpoint pour enregistrer un nouvel Étudiant."""
    serializer_class = StudentRegistrationSerializer
    permission_classes = [permissions.AllowAny]