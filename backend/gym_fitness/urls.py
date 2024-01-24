# urls.py
from django.contrib import admin
from django.urls import path
from manager.views import manager_api
from customer.views import customer_api
from assistant_manager.views import manager_assistant_detail, manager_assistant_list,instructor_list,delete_instructor
from accounts.views import create_account, get_accounts, create_paid_account, get_paid_accounts, delete_account
from workout.views import create_workout,get_workouts,create_diet,get_diets,delete_workout
from Reports.views import customer_reports,monthly_bills,salaries,rents,profits,delete_monthly_bill
from backup.views import BackupListCreateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path("manager_api", manager_api, name="manager_api"),
    path('api/customer_registration/', customer_api, name='customer_api'),
    path('api/customer_registration/<int:customer_id>/', customer_api, name='delete_customer'),
    path('create-workout', create_workout, name="create_workout"),
    path('get-workouts', get_workouts, name="get_workouts"), 
    path('delete-workout/<int:workout_id>/', delete_workout, name='delete_workout'),
    path('get-diet', get_diets,name="get_diets"),
    path("create-diet",create_diet,name="create_diet"),
    path('api/manager_assistants/', manager_assistant_list, name='manager-assistant-list'),
    path('api/manager_assistants/<int:pk>/', manager_assistant_detail, name='manager-assistant-detail'),
    path('api/instructors', instructor_list, name='instructor_list'),
    path('api/instructors/<int:instructor_id>/', delete_instructor, name='delete_instructor'),
    path('create-account/', create_account, name='create_account'),
    path('get-accounts/', get_accounts, name='get_accounts'),
    path('delete-account/<int:account_id>/', delete_account, name='delete_account'),
    path('create-paid-account/', create_paid_account, name='create_paid_account'),
    path('get-paid-accounts/', get_paid_accounts, name='get_paid_accounts'),
    path('customer-reports', customer_reports, name='customer_reports'),  
    path('customer-reports/<int:report_id>', customer_reports, name='delete_customer_report'), 
    path('monthly-bills', monthly_bills, name='monthly_bills'),
    path('monthly-bills/<int:bill_id>/', delete_monthly_bill, name='delete_monthly_bill'),
    path('salaries', salaries, name='salaries'),
    path('salaries/<int:salary_id>/', salaries, name='salaries'),
    path('rents', rents, name='rents'), 
    path('rents/<int:rent_id>/', rents, name='rent-detail'),
    path('profits', profits, name='profits'),
    path('profits/<int:profit_id>/', profits, name='profit-detail'),
    path('api/backups/', BackupListCreateView.as_view(), name='backup-list-create'),
]
