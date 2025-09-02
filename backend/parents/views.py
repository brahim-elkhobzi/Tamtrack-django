from rest_framework import generics, permissions
from .serializers import ParentRegistrationSerializer

class ParentRegistrationView(generics.CreateAPIView):
    """
    Endpoint API pour enregistrer un nouveau Parent.
    Accessible par n'importe qui (pas besoin d'être authentifié).
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = ParentRegistrationSerializer