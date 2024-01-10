from django.db import models

class FAQ(models.Model):
   question = models.CharField(max_length=200)
   answer = models.TextField()
   
   def serialize(self):
        return {
            'id': self.id,
            'question': self.question,
        }