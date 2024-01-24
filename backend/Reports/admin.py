# admin.py

from django.contrib import admin
from .models import CustomerReports, MonthlyBill, Salary, Rent, Profit

@admin.register(CustomerReports)
class CustomerReportsAdmin(admin.ModelAdmin):
    list_display = ('username', 'customer_id', 'fitness_level', 'improvement')

@admin.register(MonthlyBill)
class MonthlyBillAdmin(admin.ModelAdmin):
    list_display = ('date', 'amount')

@admin.register(Salary)
class SalaryAdmin(admin.ModelAdmin):
    list_display = ('date', 'amount')

@admin.register(Rent)
class RentAdmin(admin.ModelAdmin):
    list_display = ('date', 'amount')

@admin.register(Profit)
class ProfitAdmin(admin.ModelAdmin):
    list_display = ('daily_profit', 'monthly_profit', 'yearly_profit')
