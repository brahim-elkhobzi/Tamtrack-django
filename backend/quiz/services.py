# quiz/services.py

from .quiz_data import tronc_commun, premier_bac, deuxieme_bac
import random

# Un dictionnaire pour faire le lien entre le "level" et le bon module de données
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
    
    # On renvoie juste les clés du dictionnaire, qui sont les noms des thèmes
    return list(questions_data.keys())


def get_quiz_questions(level: str, topic: str, count: int = 10):
    """
    Retourne une liste de questions mélangées pour un niveau et un thème donnés.
    """
    level = level.lower()
    if level not in LEVEL_DATA_MAP:
        return []

    questions_data = LEVEL_DATA_MAP[level]
    
    # Vérifier si le thème existe pour ce niveau
    if topic not in questions_data:
        return []

    all_questions = questions_data[topic]
    
    # Mélanger et sélectionner le nombre de questions demandé
    random.shuffle(all_questions)
    
    questions_to_return = all_questions[:count]
    
    # Préparer les données pour le frontend : ne jamais envoyer la bonne réponse
    sanitized_questions = []
    for q in questions_to_return:
        # Copier pour ne pas modifier l'original
        question_copy = q.copy() 
        # On supprime la réponse correcte
        del question_copy['correct'] 
        # On peut aussi mélanger les options ici si on le souhaite
        random.shuffle(question_copy['options'])
        sanitized_questions.append(question_copy)

    return sanitized_questions

def check_answer(level: str, topic: str, question_id: str, submitted_option: str):
    """
    Vérifie si une réponse soumise est correcte.
    """
    level = level.lower()
    if level not in LEVEL_DATA_MAP:
        return None

    questions_data = LEVEL_DATA_MAP[level]
    if topic not in questions_data:
        return None

    # Trouver la question par son ID
    for question in questions_data[topic]:
        if question.get('id') == question_id:
            is_correct = (submitted_option == question['correct'])
            return {
                "is_correct": is_correct,
                "correct_answer": question['correct'],
                "explanation": question['explanation']
            }
            
    return None # Question non trouvée