

# GenerateCourse/views.py

from django.conf import settings
from django.contrib.auth import get_user_model
from groq import Groq
import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Imports depuis vos autres applications pour récupérer les données de l'élève
from quiz.models import Recommendation
from students.models import Student

logger = logging.getLogger(__name__)
User = get_user_model()

# ==========================================================
# INITIALISATION DU CLIENT GROQ (Bonne Pratique)
# ==========================================================
groq_client = None
if settings.GROQ_API_KEY:
    try:
        groq_client = Groq(api_key=settings.GROQ_API_KEY)
        print("INFO: Client Groq initialisé avec succès.")
    except Exception as e:
        logger.critical(f"ERREUR CRITIQUE: L'initialisation du client Groq a échoué: {e}")
else:
    logger.warning("AVERTISSEMENT: GROQ_API_KEY non définie. Le service IA ne fonctionnera pas.")

# ==========================================================
# VUE DE GÉNÉRATION DE COURS PERSONNALISÉS (remplace l'ancienne)
# ==========================================================
class GenerateCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, matiere_name, *args, **kwargs):
        user = request.user
        matiere = matiere_name.lower()  
        # --- 1. Vérifications Préliminaires ---
        if not groq_client:
            return Response(
                {"error": "Le service de génération de contenu est actuellement indisponible."}, 
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )

        try:
            student = Student.objects.get(pk=user.pk)
            user_level = student.level or "tronc commun"
        except Student.DoesNotExist:
            return Response(
                {"error": "Le profil étudiant associé à votre compte est introuvable."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # --- 2. Récupération des Données ---
        last_recommendation = Recommendation.objects.filter(user=user, matiere=matiere).order_by('-timestamp').first()
        course_topic = last_recommendation.text if last_recommendation else "Les bases des mathématiques"

        print(f"INFO: Tentative de génération de cours pour '{user.email}' sur le thème : '{course_topic}'")

        # --- 3. Interaction avec l'API IA ---
        try:
            system_prompt = f"""
            ... (votre prompt est excellent, il ne change pas) ...
            """
            user_prompt = f"""Crée un cours concis ... basé sur la recommandation : '{course_topic}'."""
            
            completion = groq_client.chat.completions.create(
                model="groq/compound-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.6,
                max_tokens=4000,
            )
            course_content = completion.choices[0].message.content
            
            # On vérifie que le contenu n'est pas vide
            if not course_content or not course_content.strip():
                 return Response(
                    {"error": "Le service IA a renvoyé un contenu vide. Veuillez réessayer."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                 )
            
            # --- 4. SI TOUT A RÉUSSI, ON RENVOIE LE BON FORMAT ---
            return Response({
                "level_used": user_level,
                "recommendation_used": course_topic,
                "course_content": course_content
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Erreur API Groq [GenerateCustomizedCourse]: {e}")
            return Response(
                {"error": "Une erreur de communication est survenue avec le service d'IA."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )