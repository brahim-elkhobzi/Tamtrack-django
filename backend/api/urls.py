from django.urls import path, include
from django.urls import path
#fro .views import GroqLlamaView

urlpatterns = [
    path('user/', include('userauths.urls')),
    path('chat/', include('chat.urls')),
    path('quiz/', include('quiz.urls')),

    # path('chat/', GroqLlamaView.as_view(), name='groq-llama-chat'),
]