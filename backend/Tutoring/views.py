# votre_app_api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response

from django.conf import settings
from groq import Groq

groq_client = None
if settings.GROQ_API_KEY:
    try:
        groq_client = Groq(api_key=settings.GROQ_API_KEY)
    except Exception as e:
        print(f"ERREUR CRITIQUE: L'initialisation du client Groq a échoué: {e}")
# ...

class TutorChatView(APIView):
    def post(self, request, *args, **kwargs):
        prompt = request.data.get('prompt')
        history = request.data.get('history', [])

        if not groq_client:
            return Response({"error": "Service IA non configuré."}, status=503)

        
        if prompt is None:
            return Response({"error": "Le champ 'prompt' est requis et ne peut être nul."}, status=400)
        
        system_prompt = """
        Tu es 'Ahmed', un tuteur IA de TamTrack. Ta personnalité est celle d'un tuteur marocain moderne : amical, encourageant, patient et expert en mathématiques. 
        Tu commences toujours tes conversations en te présentant.
        Ton but est d'expliquer des concepts complexes simplement. Utilise des exemples clairs. 
        Pour les équations, utilise le format LaTeX (par exemple, `$x^2 - 5x + 6 = 0$`).
        Tu dois te souvenir du contexte de la conversation.
        """
        
        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(history)
        messages.append({"role": "user", "content": prompt})
        
        try:
            chat_completion = groq_client.chat.completions.create(
                messages=messages,
                model="gemma2-9b-it", 
            )
            response = chat_completion.choices[0].message.content
            return Response({'response': response}, status=200)

       
        except Exception as e:

            print(f"--- ERREUR LORS DE L'APPEL A GROQ ---")
            print(f"Type d'erreur: {type(e).__name__}")
            print(f"Message d'erreur: {e}")
            print(f"--- FIN DE L'ERREUR ---")
            
            return Response({"error": "Erreur interne de l'API IA", "details": str(e)}, status=500)