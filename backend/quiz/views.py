from django.shortcuts import render

# Create your views here.
# quiz/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from . import services # Importer le fichier de services

class TopicListView(APIView):
    permission_classes = [IsAuthenticated] # S'assurer que l'utilisateur est connecté

    def get(self, request):
        user_level = request.user.level
        print(f"User level: {user_level}")
        
        # Appeler le service pour obtenir les thèmes
        topics = services.get_topics_for_level(user_level)
        
        return Response(topics)


class QuizQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, topic_name):
        user_level = request.user.level

        # Appeler le service pour obtenir les questions du quiz
        questions = services.get_quiz_questions(user_level, topic_name)

        if not questions:
            return Response({'error': f'Aucune question trouvée pour le thème "{topic_name}" à votre niveau.'}, status=404)
        
        return Response(questions)


class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, topic_name, question_id):
        user_level = request.user.level
        user_answer = request.data.get('answer')

        if not user_answer:
            return Response({'error': 'La réponse (answer) est requise.'}, status=400)
            
        result = services.check_answer(user_level, topic_name, question_id, user_answer)

        if result is None:
            return Response({'error': 'Question non trouvée.'}, status=404)
        
        # Ici, vous pourriez stocker le résultat de l'utilisateur dans la base de données (UserScore)
        # Mais les questions elles-mêmes restent dans le fichier
        
        return Response(result)