# votre_app_api/views.py

from django.conf import settings
from groq import Groq
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# --- CORRECTION PRINCIPALE ---
# 1. Le client est initialisé UNE SEULE FOIS, au démarrage du serveur, pour de meilleures performances.
groq_client = None
if settings.GROQ_API_KEY:
    try:
        # On utilise la variable centralisée depuis settings.py
        groq_client = Groq(api_key=settings.GROQ_API_KEY)
        print("Client Groq initialisé avec succès.")
    except Exception as e:
        # Cette erreur apparaîtra dans les logs du serveur au démarrage si la clé est invalide
        print(f"ERREUR CRITIQUE: L'initialisation du client Groq a échoué: {e}")
else:
    # Message d'avertissement clair si la clé n'est pas du tout trouvée
    print("AVERTISSEMENT: GROQ_API_KEY non trouvée dans les paramètres. Le service d'IA ne fonctionnera pas.")
# --- FIN DE LA CORRECTION ---


class SolveProblemView(APIView):
    def post(self, request, *args, **kwargs):
        """
        Reçoit un problème mathématique, l'envoie à Groq et renvoie la solution.
        """
        # 2. On vérifie d'abord si le client partagé a été correctement initialisé.
        if not groq_client:
            return Response(
                {"error": "Le service d'IA n'est pas configuré correctement sur le serveur (clé API manquante ou invalide)."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE # 503 Service Unavailable est plus approprié
            )

        problem_text = request.data.get('problem_text')
        if not problem_text:
            return Response(
                {"error": "Le champ problem_text est obligatoire."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3. On utilise le client partagé (groq_client) à l'intérieur d'un bloc try...except
        #    pour gérer les erreurs qui surviennent PENDANT l'appel API (réseau, etc.).
        try:
            system_prompt = """
            You are a mathematics tutor specializing in general math problems.
            For each problem:
            1. Restate the problem clearly.
            2. Identify the mathematical concepts and formulas needed.
            3. Break down the solution into clear, sequential steps.
            4. Show all working and calculations.
            5. Explain the reasoning behind each step.
            6. Format mathematical expressions and equations in LaTeX using $...$ for inline and $$...$$ for display math.
            7. Include a final answer clearly marked.
            8. Use the language French.
            """

            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": problem_text}
                ],
                model="llama3-8b-8192",
            )

            solution = chat_completion.choices[0].message.content

            return Response({
                "problem": problem_text,
                "solution": solution
            }, status=status.HTTP_200_OK)

        except Exception as e:
            # Gère les erreurs d'exécution de l'appel (ex: le service Groq est en panne)
            print(f"Erreur lors de l'appel API à Groq: {e}")
            return Response(
                {"error": "Une erreur est survenue lors de la communication avec le service d'IA."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )