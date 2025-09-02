from rest_framework import generics, permissions
from .serializers import TeacherRegistrationSerializer

class TeacherRegistrationView(generics.CreateAPIView):
    """
    Endpoint API pour enregistrer un nouveau Professeur.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = TeacherRegistrationSerializer