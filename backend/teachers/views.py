# teachers/views.py
from rest_framework import generics, permissions
from .serializers import TeacherRegistrationSerializer

class TeacherRegistrationView(generics.CreateAPIView):
    """Endpoint pour enregistrer un nouvel Enseignant."""
    serializer_class = TeacherRegistrationSerializer
    permission_classes = [permissions.AllowAny]