
# quiz/urls.py
from django.urls import path
from .views import TopicListView, QuizQuestionsView, SubmitAnswerView

from .views import FullQuizView
from .views import SubmitAnswerView ,save_profile 
from .views import get_recommendation_and_exercises ,SubmitAnswerView 

urlpatterns = [
    
    path('topics/', TopicListView.as_view(), name='topic-list'),

    
    path('questions/<str:topic_name>/', QuizQuestionsView.as_view(), name='quiz-questions'),


    



    path('get-full-quiz/<str:matiere>/', FullQuizView.as_view(), name='get-full-quiz'),
    path('<str:matiere>/submit-answer/<str:topic_name>/<path:question_text>/', SubmitAnswerView.as_view(), name='submit-answer'),
    path('save_profile/', save_profile, name='save-profile'),

    # quiz/urls.py
    path('recommendation-exercises/', get_recommendation_and_exercises, name='get-recommendation-and-exercises'),

    
]