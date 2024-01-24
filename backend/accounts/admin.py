from django.contrib import admin
from .models import Accounts, PaidAccount

@admin.register(Accounts)
class AccountsAdmin(admin.ModelAdmin):
    list_display = ['customer_id','username', 'Customer_Fee_amount', 'Staff_Salary_Amount', 'Rent_Amount', 'payment_date']

@admin.register(PaidAccount)
class PaidAccountAdmin(admin.ModelAdmin):
    list_display = ['customer_id','username', 'payment_date', 'customer_fee_paid', 'staff_salary_paid', 'rent_paid']
