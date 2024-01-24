# models.py

from django.db import models

class Accounts(models.Model):
    customer_id=models.CharField(max_length=50)
    username=models.CharField(max_length=50)

    Customer_Fee_amount = models.DecimalField(max_digits=10, decimal_places=2)
    Staff_Salary_Amount = models.DecimalField(max_digits=10, decimal_places=2)
    Rent_Amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.Customer_Fee_amount} {self.Staff_Salary_Amount} {self.Rent_Amount} {self.payment_date}"



class PaidAccount(models.Model):
    username = models.CharField(max_length=255)
    customer_id = models.CharField(max_length=255)
    payment_date = models.DateField()
    customer_fee_paid = models.DecimalField(max_digits=10, decimal_places=2)
    staff_salary_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rent_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f'{self.username} - {self.customer_id} - {self.payment_date}'
