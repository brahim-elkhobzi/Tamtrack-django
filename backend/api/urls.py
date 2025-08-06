from django.urls import path, include
from django.urls import path
#fro .views import GroqLlamaView


urlpatterns = [
    path('user/', include('userauths.urls')),
    path('chat/', include('chat.urls')),
    path('quiz/', include('quiz.urls')),
    path('profiles/', include('profiles.urls')),
    path('solve/', include("solve.urls")),
    path('generate-course/', include('generat_cours.urls')),
]