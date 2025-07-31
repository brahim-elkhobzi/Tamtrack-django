# quiz/urls.py
from django.urls import path
from .views import TopicListView, QuizQuestionsView, SubmitAnswerView

from .views import FullQuizView
from .views import SubmitAnswerView

urlpatterns = [
    # API pour obtenir la liste des thèmes de l'utilisateur
    # GET /api/quiz/topics/
    path('topics/', TopicListView.as_view(), name='topic-list'),

    # API pour obtenir les questions pour un thème spécifique
    # GET /api/quiz/questions/Ensembles de nombres/
    path('questions/<str:topic_name>/', QuizQuestionsView.as_view(), name='quiz-questions'),


    path('submit/<str:topic_name>/<path:question_text>/', SubmitAnswerView.as_view(), name='submit-answer'),




    path('get-full-quiz/', FullQuizView.as_view(), name='get-full-quiz'),
    
    
]