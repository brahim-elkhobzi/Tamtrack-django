
from django.urls import path
from .views import *

urlpatterns = [
    
    path("", GroqLlamaView.as_view(), name="groq_llama_chat"),

    
    
  ]