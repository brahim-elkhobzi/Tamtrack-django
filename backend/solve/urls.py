from django.urls import path
from .views import SolveProblemView

urlpatterns = [
    path('', SolveProblemView.as_view(), name='solve_problem'),
]