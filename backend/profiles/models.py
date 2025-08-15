# profiles/models.py
from django.db import models
from userauths.models import User
from quiz.models import Topic

class UserScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    score  = models.PositiveIntegerField(default=0)
    recommendation = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('user',)
    def __str__(self):
        return f"Score de {self.user.email}"

    
