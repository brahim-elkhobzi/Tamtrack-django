# profiles/models.py
from django.db import models
from django.conf import settings
from quiz.models import Topic

class UserScore(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='scores')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='user_scores')
    correct_answers = models.PositiveIntegerField(default=0)
    total_answered = models.PositiveIntegerField(default=0)
    class Meta:
        unique_together = ('user', 'topic')
    def __str__(self):
        return f"Score de {self.user.email} sur '{self.topic.name}'"