from django.db import models
from django.utils import timezone

class Customer(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField()
    customer_id = models.CharField(max_length=255, unique=True ) 
    bmi = models.FloatField(null=True, blank=True)
    height_inches = models.FloatField(null=True, blank=True)
    height_feet = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    goal=models.CharField(max_length=255)


def __str__(self):
    return f"{self.username} - {self.id}"
