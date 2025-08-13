# parents/views.py

from rest_framework import generics, permissions
from .serializers import ParentRegistrationSerializer

class ParentRegistrationView(generics.CreateAPIView):
    """
    Endpoint API public pour qu'un nouveau parent puisse s'enregistrer.
    POST: /api/parents/register/
    """
    serializer_class = ParentRegistrationSerializer
    # AllowAny signifie que n'importe qui peut accéder à cette vue (pas besoin d'être connecté).
    permission_classes = [permissions.AllowAny]

