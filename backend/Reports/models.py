from django.db import models

# Create your models here.
class  CustomerReports(models.Model):
    username =models.CharField(max_length= 255)
    customer_id = models.CharField(max_length=255)
    fitness_level=models.CharField(max_length=255)
    improvement = models.CharField(max_length=255)

class MonthlyBill(models.Model):
    date=models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
class Salary(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)

class Rent(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
class Profit(models.Model):
    daily_profit =models.DecimalField(max_digits=10, decimal_places=2)
    monthly_profit=models.DecimalField(max_digits=10, decimal_places=2) 
    yearly_profit=models.DecimalField(max_digits=10, decimal_places=2)