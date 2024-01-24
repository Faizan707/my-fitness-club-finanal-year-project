# models.py
from django.db import models

class ManagerAssistant(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    ManagerAssistant_id=models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name,self.phone
    
class Instructor(models.Model):
    name =models.CharField(max_length=50)
    instructor_ID=models.CharField(max_length=50)
    instructor_phone_no=models.CharField(max_length=50)
    qualification=models.CharField(max_length=255)
    timings=models.CharField(max_length=50)
    def __str__(self) :
        return self.name,self.instructor_phone_no,self.qualification,self.timings