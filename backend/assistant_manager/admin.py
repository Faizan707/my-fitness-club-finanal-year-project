from django.contrib import admin
from .models import ManagerAssistant, Instructor

@admin.register(ManagerAssistant)
class ManagerAssistantAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "phone", "ManagerAssistant_id")

@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ["instructor_ID", "name", "instructor_phone_no", "qualification", "timings"]
