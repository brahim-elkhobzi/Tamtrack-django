
from django.urls import path, include
from parents.views import ParentRegistrationView
from students.views import StudentRegistrationView
from teachers.views import TeacherRegistrationView

urlpatterns = [
    # Authentification et gestion de l'utilisateur de base
    # Route: /api/user/login/, /api/user/token/refresh/, etc.
    path('user/', include('userauths.urls')),

    # ---- URLS D'INSCRIPTION SPÉCIFIQUES ----
    # Nous retirons le préfixe 'api/' car il est déjà dans `core/urls.py`
    path('register/student/', StudentRegistrationView.as_view(), name='register-student'),
    path('register/parent/', ParentRegistrationView.as_view(), name='register-parent'),
    path('register/teacher/', TeacherRegistrationView.as_view(), name='register-teacher'),

    # ---- INCLUSION DE TOUTES LES AUTRES APPLICATIONS DE L'API ----
    # Route: /api/chat/...
    path('chat/', include('chat.urls')),
    # Route: /api/quiz/...
    path('quiz/', include('quiz.urls')),
    # Route: /api/profiles/...
    path('profiles/', include('profiles.urls')),
    # Route: /api/solve/...
    path('solve/', include('solve.urls')),
    # Route: /api/generate-course/...
    path('generate-course/', include('generat_cours.urls')), # Attention à la coquille ici
    # Route: /api/tutoring/...
    path('tutoring/', include('Tutoring.urls')), # Recommandé de mettre en minuscule
    
]