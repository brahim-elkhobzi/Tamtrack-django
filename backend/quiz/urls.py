# quiz/urls.py
from django.urls import path
from .views import TopicListView, QuizQuestionsView, SubmitAnswerView

from .views import FullQuizView
from .views import SubmitAnswerView ,save_profile 

urlpatterns = [
    
    path('topics/', TopicListView.as_view(), name='topic-list'),

    
    path('questions/<str:topic_name>/', QuizQuestionsView.as_view(), name='quiz-questions'),


    path('submit/<str:topic_name>/<path:question_text>/', SubmitAnswerView.as_view(), name='submit-answer'),




    path('get-full-quiz/', FullQuizView.as_view(), name='get-full-quiz'),
    path('submit-answer/<str:topic_name>/<path:question_text>/', SubmitAnswerView.as_view(), name='submit-answer'),

    path('save_profile/', save_profile, name='save-profile'),

    
]