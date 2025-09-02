from django.db import models
from userauths.models import User

class Topic(models.Model):
    name = models.CharField(max_length=255)
    level = models.CharField(max_length=50)
    class Meta:
        unique_together = ('name', 'level')
    def __str__(self):
        return f"{self.name} ({self.level})"

class Question(models.Model):
    topic = models.ForeignKey(Topic, related_name='questions', on_delete=models.CASCADE)
    question_text = models.TextField(unique=True)
    explanation = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.question_text[:50]




####     quiz      scores   ####
class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="scores")
    topic = models.CharField(max_length=255) # Utilise un CharField
    score = models.PositiveIntegerField(default=0)
    recommendation = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'topic')

    def __str__(self):
        return f"Score de {self.user.get_full_name()} sur '{self.topic}': {self.score}%"

class Recommendation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Recommandation pour {self.user.get_full_name()}"