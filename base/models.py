from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=30)
    character = models.CharField(max_length=30)
    created = models.DateTimeField(auto_now_add=True)
    isUber = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    items = models.ManyToManyField(Item, blank=True)