# Fichier : quiz/views.py

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from groq import Groq
import json

from django.conf import settings

from . import services  # Importer votre fichier de logique métier
from .models import Recommendation, Score
from students.models import Student

# Initialize the Groq client (replace 'YOUR_GROQ_API_KEY' with your actual API key)
groq_client = Groq(api_key=settings.GROQ_API_KEY)

# Récupère le modèle User de base configuré dans settings.py ('userauths.User')
User = get_user_model()


# ==========================================================
# VUES SPÉCIFIQUES AUX ÉTUDIANTS (AVEC VÉRIFICATION DE RÔLE)
# ==========================================================

class FullQuizView(APIView):
    """
    Récupère l'intégralité du quiz guidé pour l'étudiant connecté.
    Applique une logique de niveau par défaut.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Étape 1 : S'assurer que l'utilisateur est un étudiant
        if not hasattr(user, 'student'):
            return Response(
                {"detail": "Cette fonctionnalité est uniquement accessible aux étudiants."},
                status=status.HTTP_403_FORBIDDEN
            )
            
        # Étape 2 : Accéder au niveau via la relation enfant 'student'
        user_level = user.student.level

        # Étape 3 : Appliquer une valeur par défaut si le niveau n'est pas défini
        if not user_level:
            user_level = "tronc commun"
        
        # Étape 4 : Appeler le service pour récupérer les données du quiz
        full_quiz_data = services.get_full_quiz_by_level(user_level)

        if not full_quiz_data:
             return Response(
                {"detail": f"Aucun quiz trouvé pour le niveau : {user_level}."},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(full_quiz_data, status=status.HTTP_200_OK)


class TopicListView(APIView):
    """
    Liste les thèmes de quiz disponibles pour le niveau de l'étudiant connecté.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        if not hasattr(user, 'student'):
            return Response({"detail": "Cette fonctionnalité est réservée aux étudiants."}, status=status.HTTP_403_FORBIDDEN)
            
        user_level = user.student.level
        if not user_level:
            user_level = "tronc commun"
        
        topics = services.get_topics_for_level(user_level)
        return Response(topics)


class QuizQuestionsView(APIView):
    """
    Récupère les questions d'un thème spécifique pour le niveau de l'étudiant.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, topic_name):
        user = request.user
        
        if not hasattr(user, 'student'):
            return Response({"detail": "Cette fonctionnalité est réservée aux étudiants."}, status=status.HTTP_403_FORBIDDEN)
        
        user_level = user.student.level
        if not user_level:
            user_level = "tronc commun"

        questions = services.get_quiz_questions(user_level, topic_name)

        if not questions:
            return Response({'error': f'Aucune question trouvée pour le thème "{topic_name}" à votre niveau.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(questions)


class SubmitAnswerView(APIView):
    """
    Permet à un étudiant de soumettre une réponse et de recevoir un feedback.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, topic_name, question_text):
        user = request.user
        
        if not hasattr(user, 'student'):
            return Response({"detail": "Cette fonctionnalité est réservée aux étudiants."}, status=status.HTTP_403_FORBIDDEN)

        user_level = user.student.level
        if not user_level:
            user_level = "tronc commun"

        user_answer = request.data.get('answer')
        if not user_answer:
            return Response({'error': 'La réponse ("answer") est requise.'}, status=status.HTTP_400_BAD_REQUEST)
            
        result = services.check_answer(user_level, topic_name, question_text, user_answer)
        if result is None:
            return Response({'error': 'Question non trouvée.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(result, status=status.HTTP_200_OK)


# ==========================================================
# VUE UNIVERSELLE (POUR TOUS LES UTILISATEURS CONNECTÉS)
# ==========================================================

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # Utilise les décorateurs DRF pour les vues basées sur des fonctions
def save_profile(request):
    """
    Enregistre les scores finaux du quiz et la recommandation pour l'utilisateur connecté.
    Cette vue fonctionne pour n'importe quel utilisateur connecté (car elle n'a pas besoin de 'level').
    """
    try:
        data = request.data
        user = request.user 

        if not isinstance(data, list):
             return Response({"error": "Les données envoyées doivent être une liste d'objets."}, status=status.HTTP_400_BAD_REQUEST)

        recommendation_text_to_save = ""
        for item in data:
            topic = item.get('topic')
            score_value = item.get('score')
            recommendation_text = item.get('recommendation')

            if topic is not None and score_value is not None:
                Score.objects.update_or_create(
                    user=user,
                    topic=topic,
                    defaults={'score': score_value}
                )
            
            # On garde en mémoire la dernière recommandation pour la sauvegarder à la fin
            if recommendation_text:
                recommendation_text_to_save = recommendation_text

        if recommendation_text_to_save:
            Recommendation.objects.update_or_create(
                user=user,
                defaults={'text': recommendation_text_to_save}
            )

        return Response({"message": "Scores et recommandation enregistrés avec succès !"}, status=status.HTTP_200_OK)

    except Exception as e:
        # Il est bon de loguer l'erreur pour le débogage
        print(f"Erreur lors de la sauvegarde du profil : {e}")
        return Response({"error": "Une erreur interne est survenue lors de la sauvegarde."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendation_and_exercises(request):
    """
    Récupère la recommandation de l'utilisateur et génère des exercices
    adaptatifs en se basant sur la recommandation ET le niveau de l'étudiant.
    """
    user = request.user

    # Étape 1 : Vérifier si l'utilisateur est un étudiant et récupérer son niveau
    if not hasattr(user, 'student'):
        return Response(
            {"detail": "Cette fonctionnalité est uniquement accessible aux étudiants."},
            status=status.HTTP_403_FORBIDDEN
        )
    
    user_level = user.student.level
    if not user_level:
        user_level = "tronc commun" # Valeur par défaut robuste

    # Étape 2 : Vérifier que le service IA est disponible
    if not groq_client:
        return Response({"error": "Service IA indisponible."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    try:
        # Étape 3 : Récupérer la dernière recommandation pour l'utilisateur
        recommendation = Recommendation.objects.filter(user=user).order_by('-timestamp').first()
        recommendation_text = recommendation.text if recommendation else "L'étudiant est débutant dans ce domaine."

        # ==========================================================
        # Étape 4 : CONSTRUIRE LE PROMPT DYNAMIQUE AVEC LE NIVEAU
        # ==========================================================
        prompt = (
            f"Tu es un tuteur de mathématiques expert et encourageant. "
            f"Un de tes étudiants, qui est au niveau scolaire '{user_level}', a reçu la recommandation suivante : '{recommendation_text}'. "
            f"En te basant sur ces deux informations (son niveau et la recommandation), génère 3 exercices de mathématiques pertinents et adaptatifs. "
            f"Ta réponse doit être UNIQUEMENT un objet JSON valide, sans aucun texte ou explication avant ou après. "
            f"L'objet JSON doit avoir une seule clé 'exercises', qui contient une liste de 3 objets. "
            f"Chaque objet exercice doit avoir les clés suivantes : "
            f"'title' (le nom court du concept, ex: 'Résolution d'équation du second degré'), "
            f"'difficulty' (une chaîne: 'Facile', 'Moyen', ou 'Difficile', en fonction de la complexité pour ce niveau), "
            f"'question' (l'énoncé mathématique en utilisant la syntaxe LaTeX pour les formules, ex: 'Quelles sont les solutions de $x^2 + 3x - 4 = 0$ ?'), "
            f"'options' (une liste de 4 chaînes de caractères en LaTeX pour les choix de réponse), et "
            f"'correct_answer' (la chaîne de caractères exacte de la bonne réponse)."
        )
        messages = [{"role": "user", "content": prompt}]

        
        chat_completion = groq_client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",  
            temperature=0.8,
            response_format={"type": "json_object"},
        )

        # Étape 6 : Parser la réponse
        ia_response_content = chat_completion.choices[0].message.content
        ia_data = json.loads(ia_response_content)
        exercises = ia_data.get("exercises", [])

        return Response({
            "recommendation": recommendation_text,
            "exercises": exercises,
        }, status=status.HTTP_200_OK)

    except json.JSONDecodeError:
         return Response({"error": "La réponse du service IA n'était pas un JSON valide."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        print(f"Erreur lors de la génération d'exercices : {e}")
        return Response({"error": "Une erreur interne est survenue lors de la génération des exercices."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)