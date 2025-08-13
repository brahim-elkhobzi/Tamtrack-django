
# Fichier parents/urls.py
from django.urls import path
from .views import ParentRegistrationView

urlpatterns = [
    path('register/', ParentRegistrationView.as_view(), name='parent-register'),
]