
from django.urls import path
from .views import *

urlpatterns = [
    
    #path("", GroqLlamaView.as_view(), name="groq_llama_chat"),

    path('conversation/', ChatView.as_view(), name='chat-conversation'),
    
  ]