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
    path('Tutoring/', include('Tutoring.urls')),

    
    # URLs pour les profils
    path('parents/', include('parents.urls')),
    path('students/', include('students.urls')),
    path('teachers/', include('teachers.urls')),
]
