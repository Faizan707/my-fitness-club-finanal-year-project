from django.db import models

class Workout(models.Model):
    customer_id = models.CharField(max_length=50 ,blank=False )
    username=models.CharField(max_length= 500,blank=False)
    workout_name = models.CharField(max_length=50,blank=False)
    exercises_name = models.CharField(max_length=200,blank=False)
    sets = models.CharField(max_length=50,blank=False)
    reps = models.CharField(max_length = 50,blank=False)
    def __str__(self):
        return f"{self.username} {self.workout_name} {self.customer_id}  {self.exercises_name} {self.sets} {self.reps}"
from django.db import models

class Diet(models.Model):
    customer_id = models.CharField(max_length=500)
    username = models.CharField(max_length=50)
    food_name = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.customer_id}-{self.username}-{self.food_name} - {self.quantity}"
