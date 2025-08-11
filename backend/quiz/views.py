from django.shortcuts import render

# Create your views here.
# quiz/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from . import services # Importer le fichier de services
from .services import get_full_quiz_by_level

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from .models import Score  , Recommendation
from django.contrib.auth import get_user_model
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
    def post(self, request, topic_name, question_text):
        user_level = request.user.level
        user_answer = request.data.get('answer')

        if not user_answer:
            return Response({'error': 'La réponse (answer) est requise.'}, status=400)
            
        result = services.check_answer(user_level, topic_name, question_text, user_answer)

        if result is None:
            return Response({'error': 'Question non trouvée.'}, status=404)
        
        # Ici, vous pourriez stocker le résultat de l'utilisateur dans la base de données (UserScore)
        # Mais les questions elles-mêmes restent dans le fichier
        
        return Response(result)
    





    # quiz/views.py

# ... (vos autres vues et imports) ...

class FullQuizView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_level = request.user.level
        full_quiz_data = get_full_quiz_by_level(user_level)
        return Response(full_quiz_data)
    




######        save data to MySQL    for score and recommendation        ######




User = get_user_model()

@api_view(['POST'])
@login_required
def save_profile(request):
    try:
        data = request.data
        user = request.user

        # Save or update scores
        for item in data:
            topic = item.get('topic')
            score = item.get('score')
            recommendation_text = item.get('recommendation')

            # Save score
            Score.objects.update_or_create(
                user=user,
                topic=topic,
                defaults={'score': score}
            )

        # Save or update recommendation
        Recommendation.objects.update_or_create(
            user=user,
            defaults={'text': recommendation_text}
        )

        return Response({"message": "Scores and recommendation saved successfully!"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


