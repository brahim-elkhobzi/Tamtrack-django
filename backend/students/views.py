from rest_framework import generics, permissions
from .serializers import StudentRegistrationSerializer

class StudentRegistrationView(generics.CreateAPIView):
    """
    Endpoint API pour enregistrer un nouvel Étudiant.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = StudentRegistrationSerializer