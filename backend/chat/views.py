# backend/chat/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# On importe la fonction principale de notre service
from .services import get_ai_chat_response

class ChatView(APIView):
    """
    Endpoint principal pour interagir avec le Tuteur IA.
    Attend une requête POST avec un champ 'prompt'.
    Gère la mémoire de la conversation de manière persistante pour chaque utilisateur.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        prompt = request.data.get('prompt')

        if not prompt:
            return Response({"error": "Le champ 'prompt' est requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # On appelle notre service intelligent avec l'utilisateur et sa nouvelle question
            llm_response = get_ai_chat_response(user, prompt)
            
            # La réponse du LLM est renvoyée au frontend
            return Response({'response': llm_response}, status=status.HTTP_200_OK)

        except Exception as e:
            # Gestion des erreurs imprévues
            print(f"ERREUR CRITIQUE dans ChatView : {e}")
            return Response({"error": "Une erreur interne est survenue lors de la communication avec l'assistant IA."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)