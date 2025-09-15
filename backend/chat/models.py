# Fichier : chat/models.py

from django.db import models
# 1. IMPORTER `settings` DEPUIS `django.conf`
from django.conf import settings

# --- Modèle ChatHistory ---
class ChatHistory(models.Model):
    # 2. UTILISER `settings.AUTH_USER_MODEL` AU LIEU DE `User`
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        primary_key=True
    )
    history = models.JSONField(default=list, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        # Pour __str__, on ne peut pas utiliser get_full_name() directement,
        # donc on utilise email qui est toujours disponible.
        return f"Historique de chat pour {self.user.email}"

# --- Modèle ChatMessage (SI VOUS L'UTILISEZ ENCORE) ---
class ChatMessage(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE, 
        related_name="chat_messages"
    )
    role = models.CharField(max_length=10)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['timestamp']
    
    def __str__(self):
        return f"Message de {self.user.email} à {self.timestamp}"