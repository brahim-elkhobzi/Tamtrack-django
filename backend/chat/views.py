
# # votre_app_api/views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.conf import settings
# from groq import Groq

# # ... (initialisation du client groq_client, qui est déjà bonne) ...
# groq_client = Groq(api_key=settings.GROQ_API_KEY)


# class GroqLlamaView(APIView):
#     def post(self, request, *args, **kwargs):
#         # ... (vérification du client groq, etc.)

#         prompt = request.data.get('prompt')
#         history = request.data.get('history', [])

#         if not prompt:
#             return Response({"error": "Prompt requis."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # --- MODIFICATION CLÉ DANS LE PROMPT SYSTÈME ---
#             system_prompt = """
#             Tu es TamTrack IA, un coach d'apprentissage. Tu peux converser normalement, MAIS tu as aussi une fonction spéciale.
#             Si un utilisateur te demande d'analyser son profil, ses points forts, son style, ou quoi que ce soit lié à ses données d'apprentissage personnelles, 
#             tu DOIS répondre avec le texte suivant et RIEN D'AUTRE :

#             **[ANALYSE_PROFIL]**

#             Pour toutes les autres questions, réponds normalement en tant qu'assistant encourageant. Tu te souviens du contexte de la conversation.
#             """
            
#             messages = [{"role": "system", "content": system_prompt}]
#             messages.extend(history)
#             messages.append({"role": "user", "content": prompt})

#             chat_completion = groq_client.chat.completions.create(
#                 messages=messages,
#                 model="deepseek-r1-distill-llama-70b", # Ce modèle est suffisant pour détecter le mot clé
                
#             )
#             llm_response = chat_completion.choices[0].message.content
            
#             return Response({'response': llm_response}, status=status.HTTP_200_OK)

#         except Exception as e:
#             # ... (gestion d'erreur)
#             pass
# chat/views.py
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