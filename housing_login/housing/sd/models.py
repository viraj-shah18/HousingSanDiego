from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE) #if user is deleted, delete their posts

    def __str__(self):
        return self.title
    
    #how to find url to any post
    def get_absolute_url(self):
        #returns full path as a string - reverse
        return reverse('post-detail', kwargs={'pk':self.pk})
        