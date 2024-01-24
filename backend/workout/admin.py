# myapp/admin.py

from django.contrib import admin
from .models import Workout, Diet

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['customer_id', 'username', 'workout_name', 'exercises_name', 'sets', 'reps']
    search_fields = ['customer_id', 'username', 'workout_name']

@admin.register(Diet)
class DietAdmin(admin.ModelAdmin):
    list_display = ['customer_id','username','food_name', 'quantity']
