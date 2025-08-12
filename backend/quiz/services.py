# quiz/services.py

from .quiz_data import tronc_commun, premier_bac, deuxieme_bac
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from . import services
from .quiz_data import tronc_commun, premier_bac, deuxieme_bac

LEVEL_DATA_MAP = {
    "tronc commun": tronc_commun.questions_by_topic,
    "premier bac": premier_bac.questions_by_topic,
    "deuxieme bac": deuxieme_bac.questions_by_topic,
}



def get_topics_for_level(level: str):
    """
    Retourne la liste des thèmes (topics) disponibles pour un niveau donné.
    """
    level = level.lower()
    if level not in LEVEL_DATA_MAP:
        return []
    
    questions_data = LEVEL_DATA_MAP[level]
    
    return list(questions_data.keys())


def get_quiz_questions(level: str, topic: str, count: int = 10):
    """
    Retourne une liste de questions mélangées pour un niveau et un thème donnés.
    """
    level = level.lower()
    if level not in LEVEL_DATA_MAP:
        return []

    questions_data = LEVEL_DATA_MAP[level]
    
    if topic not in questions_data:
        return []

    all_questions = questions_data[topic]
    
    random.shuffle(all_questions)
    
    questions_to_return = all_questions[:count]
    
    sanitized_questions = []
    for q in questions_to_return:

        question_copy = q.copy() 
        
        del question_copy['correct'] 
        
        random.shuffle(question_copy['options'])
        sanitized_questions.append(question_copy)

    return sanitized_questions

def check_answer(user_level: str, topic: str, question_text: str, submitted_option: str):
    """
    Vérifie si une réponse soumise est correcte, en identifiant
    la question par son TEXTE complet de manière robuste.
    """
    level = user_level.lower().strip()
    topic = topic.strip()
    
    # Valider le niveau
    if level not in LEVEL_DATA_MAP:
        print(f"DEBUG (check_answer): Niveau '{level}' non trouvé.")
        return None

    questions_data = LEVEL_DATA_MAP[level]
    
    # Valider le thème
    if topic not in questions_data:
        print(f"DEBUG (check_answer): Thème '{topic}' non trouvé pour le niveau '{level}'. Thèmes dispo: {list(questions_data.keys())}")
        return None

    # Normaliser le texte de la question reçu de l'URL pour une comparaison fiable
    normalized_question_text = question_text.strip().lower()

    # Chercher la question en comparant les versions normalisées
    for question_from_db in questions_data[topic]:
        
        text_from_db = question_from_db.get('question')
        if not text_from_db:
            continue

        normalized_text_from_db = text_from_db.strip().lower()

        # La comparaison
        if normalized_text_from_db == normalized_question_text:
            
            # Question trouvée ! On vérifie la réponse.
            is_correct = (submitted_option.strip().lower() == str(question_from_db['correct']).strip().lower())
            
            # On retourne toutes les infos dont le frontend a besoin pour le feedback
            return {
                "is_correct": is_correct,
                "correct_answer": question_from_db['correct'],
                "explanation": question_from_db['explanation']
            }
            
    # Si après avoir parcouru toutes les questions du thème, on n'a rien trouvé
    print(f"DEBUG (check_answer): QUESTION NON TROUVÉE. Texte cherché: '{normalized_question_text}' dans le thème '{topic}'")
    return None







# quiz/services.py

# ... vos autres services ...

def get_full_quiz_by_level(level: str):
    """
    Retourne TOUTES les questions pour TOUS les thèmes d'un niveau,
    structurées par thème.
    """
    level = level.lower()
    if level not in LEVEL_DATA_MAP:
        return {}

    all_data = {}
    questions_data_for_level = LEVEL_DATA_MAP[level]
    
    for topic, questions in questions_data_for_level.items():
        # Mélanger et prendre 10 questions par thème (ou toutes si moins de 10)
        random.shuffle(questions)
        selected_questions = questions[:10]

        # Nettoyer pour le frontend
        sanitized_questions = []
        for q in selected_questions:
            question_copy = q.copy() 
            del question_copy['correct'] 
            random.shuffle(question_copy['options'])
            sanitized_questions.append(question_copy)
        
        all_data[topic] = sanitized_questions
    
    return all_data


# quiz/services.py

# ... (vos autres fonctions de service) ...

# quiz/services.py

# ... (vos imports et la définition de LEVEL_DATA_MAP) ...

class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    # CORRECTION : Le nom du paramètre ici doit correspondre à celui dans urls.py
    def post(self, request, topic_name, question_text): 
        user = request.user
        user_answer = request.data.get('answer')

        if not user_answer:
            return Response(
                {'error': 'La réponse (answer) est requise.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # On passe le `question_text` de l'URL au service de vérification
            result = services.check_answer(
                user_level=user.level, 
                topic=topic_name, 
                question_text=question_text, 
                submitted_option=user_answer
            )
            
            if result is None:
                # Cela signifie que même après normalisation, aucun texte de question n'a correspondu
                print(f"DEBUG: Question non trouvée via le service pour le texte: {question_text}")
                return Response(
                    {'error': 'Question non trouvée.'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Ici, vous pouvez ajouter la logique pour sauvegarder le score si vous le souhaitez

            return Response(result, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"ERREUR INTERNE INATTENDUE dans SubmitAnswerView: {e}")
            return Response(
                {'error': 'Une erreur interne est survenue sur le serveur.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )