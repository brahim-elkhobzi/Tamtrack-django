from django.db import models

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

