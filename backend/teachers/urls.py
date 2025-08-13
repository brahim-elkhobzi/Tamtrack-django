# teachers/urls.py
from django.urls import path
from .views import TeacherRegistrationView

urlpatterns = [
    path('register/', TeacherRegistrationView.as_view(), name='teacher-register'),
]