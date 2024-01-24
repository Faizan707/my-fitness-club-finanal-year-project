# admin.py
from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["id",'username', 'customer_id', 'email',"weight", 'bmi', 'height_inches', 'height_feet','goal']
