
# votre_app_api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from groq import Groq

# ... (initialisation du client groq_client, qui est déjà bonne) ...
groq_client = Groq(api_key=settings.GROQ_API_KEY)

# class GroqLlamaView(APIView):
#     def post(self, request):
#         if not groq_client:
#             return Response({"error": "Service IA non configuré."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # 1. Récupérer le prompt ET l'historique
#         prompt = request.data.get('prompt')
#         history = request.data.get('history', []) # Récupère l'historique, ou une liste vide si absent

#         if not prompt:
#             return Response({"error": "Le champ 'prompt' est requis."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # 2. Construire la liste des messages : système + historique + nouveau message
#             messages = [
#                 {
#                     "role": "system",
#                     "content": "Tu es TamTrack IA, un assistant personnel et un coach d'apprentissage. Tes réponses doivent être concises, encourageantes et utiles pour un étudiant."
#                 }
#             ]
#             # Ajouter les anciens messages (l'historique)
#             messages.extend(history)
#             # Ajouter le nouveau message de l'utilisateur
#             messages.append({"role": "user", "content": prompt})
            
#             chat_completion = groq_client.chat.completions.create(
#                 messages=messages, # Utiliser la liste complète de messages
#                 model="llama3-8b-8192",
#                 temperature=0.7,
#                 max_tokens=1024,
#             )

#             llm_response = chat_completion.choices[0].message.content
            
#             return Response({'response': llm_response}, status=status.HTTP_200_OK)

#         except Exception as e:
#             print(f"Erreur Groq API: {e}")
#             return Response({"error": "Erreur de communication avec le service d'IA."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# votre_app_api/views.py

class GroqLlamaView(APIView):
    def post(self, request, *args, **kwargs):
        # ... (vérification du client groq, etc.)

        prompt = request.data.get('prompt')
        history = request.data.get('history', [])

        if not prompt:
            return Response({"error": "Prompt requis."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # --- MODIFICATION CLÉ DANS LE PROMPT SYSTÈME ---
            system_prompt = """
            Tu es TamTrack IA, un coach d'apprentissage. Tu peux converser normalement, MAIS tu as aussi une fonction spéciale.
            Si un utilisateur te demande d'analyser son profil, ses points forts, son style, ou quoi que ce soit lié à ses données d'apprentissage personnelles, 
            tu DOIS répondre avec le texte suivant et RIEN D'AUTRE :

            **[ANALYSE_PROFIL]**

            Pour toutes les autres questions, réponds normalement en tant qu'assistant encourageant. Tu te souviens du contexte de la conversation.
            """
            
            messages = [{"role": "system", "content": system_prompt}]
            messages.extend(history)
            messages.append({"role": "user", "content": prompt})

            chat_completion = groq_client.chat.completions.create(
                messages=messages,
                model="deepseek-r1-distill-llama-70b", # Ce modèle est suffisant pour détecter le mot clé
                # ...
            )
            llm_response = chat_completion.choices[0].message.content
            
            return Response({'response': llm_response}, status=status.HTTP_200_OK)

        except Exception as e:
            # ... (gestion d'erreur)
            pass