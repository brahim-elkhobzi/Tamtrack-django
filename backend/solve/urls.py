from django.urls import path
from .views import SolveProblemView , SimilarProblemsView

urlpatterns = [
    path('', SolveProblemView.as_view(), name='solve_problem'),
    path('similar/', SimilarProblemsView.as_view(), name='similar_problems'),
]