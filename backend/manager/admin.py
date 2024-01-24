from django.contrib import admin
from .models import ManagerCredentials

@admin.register(ManagerCredentials)
class ManagerCredentialsAdmin(admin.ModelAdmin):
    list_display = ['username', 'password']
# your_app/admin.py

