# quiz/urls.py
from django.urls import path
from .views import TopicListView, QuizQuestionsView, SubmitAnswerView

urlpatterns = [
    # API pour obtenir la liste des thèmes de l'utilisateur
    # GET /api/quiz/topics/
    path('topics/', TopicListView.as_view(), name='topic-list'),

    # API pour obtenir les questions pour un thème spécifique
    # GET /api/quiz/questions/Ensembles de nombres/
    path('questions/<str:topic_name>/', QuizQuestionsView.as_view(), name='quiz-questions'),

    # API pour soumettre une réponse
    # POST /api/quiz/submit/Ensembles de nombres/tc_en_01/
    path('submit/<str:topic_name>/<str:question_id>/', SubmitAnswerView.as_view(), name='submit-answer'),
]