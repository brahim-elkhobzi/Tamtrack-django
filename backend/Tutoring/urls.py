from django.urls import path
from .views import TutorChatView

urlpatterns = [
    path('',TutorChatView.as_view(), name='tutor_chat'),
]