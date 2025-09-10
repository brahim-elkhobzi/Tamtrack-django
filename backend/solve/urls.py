# solve/urls.py
from django.urls import path
from .views import SolveProblemView

urlpatterns = [
    path('solve/', SolveProblemView.as_view(), name='solve-problem'),
]