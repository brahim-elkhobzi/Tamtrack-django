# # votre_app_api/views.py

# from django.conf import settings
# from groq import Groq
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# # --- CORRECTION PRINCIPALE ---
# # 1. Le client est initialisé UNE SEULE FOIS, au démarrage du serveur, pour de meilleures performances.
# groq_client = None
# if settings.GROQ_API_KEY:
#     try:
#         # On utilise la variable centralisée depuis settings.py
#         groq_client = Groq(api_key=settings.GROQ_API_KEY)
#         print("Client Groq initialisé avec succès.")
#     except Exception as e:
#         # Cette erreur apparaîtra dans les logs du serveur au démarrage si la clé est invalide
#         print(f"ERREUR CRITIQUE: L'initialisation du client Groq a échoué: {e}")
# else:
#     # Message d'avertissement clair si la clé n'est pas du tout trouvée
#     print("AVERTISSEMENT: GROQ_API_KEY non trouvée dans les paramètres. Le service d'IA ne fonctionnera pas.")
# # --- FIN DE LA CORRECTION ---


# class SolveProblemView(APIView):
#     def post(self, request, *args, **kwargs):
#         """
#         Reçoit un problème mathématique, l'envoie à Groq et renvoie la solution.
#         """
#         # 2. On vérifie d'abord si le client partagé a été correctement initialisé.
#         if not groq_client:
#             return Response(
#                 {"error": "Le service d'IA n'est pas configuré correctement sur le serveur (clé API manquante ou invalide)."},
#                 status=status.HTTP_503_SERVICE_UNAVAILABLE # 503 Service Unavailable est plus approprié
#             )

#         problem_text = request.data.get('problem_text')
#         if not problem_text:
#             return Response(
#                 {"error": "Le champ problem_text est obligatoire."},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # 3. On utilise le client partagé (groq_client) à l'intérieur d'un bloc try...except
#         #    pour gérer les erreurs qui surviennent PENDANT l'appel API (réseau, etc.).
#         try:
#             system_prompt = """
#             You are a mathematics tutor specializing in general math problems.
#             For each problem:
#             1. Restate the problem clearly.
#             2. Identify the mathematical concepts and formulas needed.
#             3. Break down the solution into clear, sequential steps.
#             4. Show all working and calculations.
#             5. Explain the reasoning behind each step.
#             6. Format mathematical expressions and equations in LaTeX using $...$ for inline and $$...$$ for display math.
#             7. Include a final answer clearly marked.
#             8. Use the language French.
#             """

#             chat_completion = groq_client.chat.completions.create(
#                 messages=[
#                     {"role": "system", "content": system_prompt},
#                     {"role": "user", "content": problem_text}
#                 ],
#                 model="llama3-8b-8192",
#             )

#             solution = chat_completion.choices[0].message.content

#             return Response({
#                 "problem": problem_text,
#                 "solution": solution
#             }, status=status.HTTP_200_OK)

#         except Exception as e:
#             # Gère les erreurs d'exécution de l'appel (ex: le service Groq est en panne)
#             print(f"Erreur lors de l'appel API à Groq: {e}")
#             return Response(
#                 {"error": "Une erreur est survenue lors de la communication avec le service d'IA."},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# votre_app_api/views.py

from django.conf import settings
from groq import Groq
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Le client partagé, initialisé une seule fois (pas de changement ici)
groq_client = None
if settings.GROQ_API_KEY:
    try:
        groq_client = Groq(api_key=settings.GROQ_API_KEY)
        print("Client Groq initialisé avec succès.")
    except Exception as e:
        print(f"ERREUR CRITIQUE: L'initialisation du client Groq a échoué: {e}")
else:
    print("AVERTISSEMENT: GROQ_API_KEY non trouvée. Le service d'IA ne fonctionnera pas.")

# Vue existante pour résoudre un problème (pas de changement ici)
class SolveProblemView(APIView):
    def post(self, request, *args, **kwargs):
        # ... (le code de cette vue reste identique) ...
        if not groq_client:
            return Response({"error": "Service non disponible."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        problem_text = request.data.get('problem_text')
        if not problem_text:
            return Response({"error": "problem_text obligatoire."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            system_prompt = """
            You are a mathematics tutor... (votre prompt complet)
            """
            chat_completion = groq_client.chat.completions.create(
                messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": problem_text}],
                model="llama3-8b-8192",
            )
            solution = chat_completion.choices[0].message.content
            return Response({"problem": problem_text, "solution": solution}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Erreur API Groq [Solve]: {e}")
            return Response({"error": "Erreur interne du service d'IA."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# --- NOUVELLE VUE POUR LES PROBLÈMES SIMILAIRES ---
class SimilarProblemsView(APIView):
    def post(self, request, *args, **kwargs):
        if not groq_client:
            return Response({"error": "Service d'IA non configuré."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        problem_text = request.data.get('problem_text')
        if not problem_text:
            return Response({"error": "Le champ problem_text est obligatoire."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Le bloc try...except est la clé pour éviter l'erreur HTML
        try:
            system_prompt = "You are an expert math curriculum designer. Your task is to generate similar problems. ONLY output the problems, numbered, without any other text, explanation or preamble. Use LaTeX for math."
            user_prompt = (
                f"Given the math problem: \"{problem_text}\", generate 3 similar but distinct problems. "
                "Format the output with LaTeX where appropriate ($inline$ or $$display$$)."
            )
            
            completion = groq_client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.8
            )
            
            response_text = completion.choices[0].message.content
            problems = [line.strip() for line in response_text.split('\n') if line.strip()]
            
            return Response({"similar_problems": problems}, status=status.HTTP_200_OK)

        except Exception as e:
            # En cas d'erreur avec l'API Groq, on log l'erreur et on renvoie un JSON propre
            logger.error(f"Erreur API Groq [SimilarProblemsView]: {e}")
            return Response(
                {"error": "Une erreur est survenue lors de la génération de problèmes similaires."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )