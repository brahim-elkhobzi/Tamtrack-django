from django.shortcuts import render

# Create your views here.
# api/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from groq import Groq

# Instanciez le client Groq une seule fois si possible
try:
    groq_client = Groq(api_key=settings.GROQ_API_KEY)
except Exception as e:
    # Gérer l'erreur si la clé API n'est pas trouvée
    print(f"Erreur lors de l'initialisation du client Groq: {e}")
    groq_client = None


class GroqLlamaView(APIView):
    def post(self, request):
        if not groq_client:
            return Response(
                {"error": "Le client Groq n'est pas initialisé. Vérifiez votre clé API."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # 1. Récupérer le prompt du corps de la requête envoyée par Next.js
        prompt = request.data.get('prompt')
        if not prompt:
            return Response(
                {"error": "Le champ 'prompt' est requis."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # 2. Appeler l'API de Groq avec le modèle Llama 3
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant." # Vous pouvez customiser ce message système
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model="llama3-8b-8192", # Un des modèles Llama 3 disponibles sur Groq
                temperature=0.7,
                max_tokens=1024,
            )

            # 3. Extraire la réponse et la renvoyer au frontend
            llm_response = chat_completion.choices[0].message.content
            
            # Ici, vous pourriez sauvegarder la conversation (prompt + llm_response) dans votre base MySQL
            # Ex: Conversation.objects.create(user=request.user, prompt=prompt, response=llm_response)
            
            return Response({'response': llm_response}, status=status.HTTP_200_OK)

        except Exception as e:
            # Gérer les erreurs de l'API Groq
            print(f"Erreur lors de l'appel à l'API Groq : {e}")
            return Response(
                {"error": "Une erreur est survenue lors de la communication avec le service d'IA."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )