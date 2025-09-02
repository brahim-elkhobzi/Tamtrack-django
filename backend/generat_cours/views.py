# votre_app_api/views.py

from django.conf import settings
from groq import Groq
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

# Le client partagé (ne change pas)
groq_client = None
if settings.GROQ_API_KEY:
    try:
        groq_client = Groq(api_key=settings.GROQ_API_KEY)
        print("Client Groq initialisé avec succès.")
    except Exception as e:
        logger.critical(f"ERREUR CRITIQUE: L'initialisation du client Groq a échoué: {e}")
else:
    logger.warning("AVERTISSEMENT: GROQ_API_KEY non trouvée.")

# --- NOUVELLE VUE POUR LA GÉNÉRATION DE COURS ---
class GenerateCourseView(APIView):
    def post(self, request, *args, **kwargs):
        if not groq_client:
            return Response({"error": "Service IA non disponible."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        level = request.data.get('level')
        starting_point = request.data.get('starting_point')

        if not level or not starting_point:
            return Response({"error": "Les champs 'level' et 'starting_point' sont requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Votre prompt, directement intégré ici
            system_prompt = f"""
            Tu es un professeur de mathématiques expérimenté, spécialisé dans l'enseignement au lycée marocain.
            Ton objectif est d'expliquer le thème **'{starting_point}'** de manière claire et progressive pour un élève de niveau **'{level}'**.
            Structure ton cours en utilisant des balises spécifiques pour chaque section:
            - Pour les titres principaux: `**Titre principal**`
            - Pour les environnements mathématiques, utilise le format `**TYPE:** Contenu.` où TYPE peut être Définition, Théorème, Preuve, Exemple, Remarque, Lemme, Corollaire. Chaque environnement doit être sur sa propre ligne.
            """
            user_prompt = f"""Génère un cours complet sur '{starting_point}' pour le niveau '{level}'. Suis strictement les directives de formatage."""
            
            completion = groq_client.chat.completions.create(
                model="deepseek-r1-distill-llama-70b", # Un modèle puissant pour du contenu de qualité
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.6,
                max_tokens=4000
            )
            course_content = completion.choices[0].message.content

            return Response({
                "level": level,
                "starting_point": starting_point,
                "content": course_content
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Erreur API Groq [GenerateCourse]: {e}")
            return Response({"error": "Erreur lors de la génération du cours."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Vous pouvez ajouter ici d'autres vues pour le QCM et la conversation sur le même modèle.
class GenerateQcmView(APIView):
    # ... logique similaire ...
    pass

class AskAboutCourseView(APIView):
    # ... logique similaire ...
    pass

