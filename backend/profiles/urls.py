from django.urls import path
from .views import SubmitAnswerView

urlpatterns = [
    path('submit-answer/<str:topic_name>/<path:question_text>/', SubmitAnswerView.as_view(), name='submit-answer'),
]