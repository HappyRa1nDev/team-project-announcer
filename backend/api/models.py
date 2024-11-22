from django.db import models
from django.conf import settings
# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=500)
    category = models.IntegerField(default=0)
    location = models.IntegerField(default=0)
    date=models.DateTimeField(null=True)
    #picture_path = models.CharField(max_length=200)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
