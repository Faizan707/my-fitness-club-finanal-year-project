# views.py
import json
import logging
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Accounts, PaidAccount
import logging

logger = logging.getLogger(__name__)


@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            customer_id = data.get('customer_id')
            username = data.get('username')
            Customer_Fee_amount = data.get('Customer_Fee_amount')
            staff_salary_amount = data.get('staff_salary_amount')
            rent_amount = data.get('rent_amount')
            payment_date = data.get('payment_date')


            account = Accounts.objects.create(
                customer_id=customer_id,
                username=username,
                Customer_Fee_amount=Customer_Fee_amount,
                Staff_Salary_Amount=staff_salary_amount,
                Rent_Amount=rent_amount,
                payment_date=payment_date
            )

            return JsonResponse({
                'id': account.id,
                'customer_id': account.customer_id,
                'username': account.username,
                'customer_fee_amount': account.Customer_Fee_amount,
                'staff_salary_amount': account.Staff_Salary_Amount,
                'rent_amount': account.Rent_Amount,
                'payment_date': payment_date
            })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            logger.exception("Error creating account")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)

@csrf_exempt
def get_accounts(request):
    if request.method == 'GET':
        accounts = Accounts.objects.all()

        data = []
        for account in accounts:
            data.append({
                'id': account.id,
                'customer':account.customer_id,
                'username': account.username,
                'customer_fee_amount': account.Customer_Fee_amount,
                'staff_salary_amount': account.Staff_Salary_Amount,
                'rent_amount': account.Rent_Amount,
                'payment_date': account.payment_date
            })

        return JsonResponse({'accounts': data})
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)

@csrf_exempt
def delete_account(request, account_id):
    if request.method == 'DELETE':
        try:
            account = get_object_or_404(Accounts, id=account_id)
            account.delete()
            return JsonResponse({'message': 'Account deleted successfully'})
        except Exception as e:
            logger.exception("Error deleting account")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)

@csrf_exempt
def create_paid_account(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get("username")
            customer_id = data.get('customer_id')
            payment_date = data.get('payment_date')
            customer_fee_paid = data.get('customer_fee_paid')
            staff_salary_paid = data.get('staff_salary_paid', 0)  
            rent_paid = data.get('rent_paid', 0)  


            PaidAccount.objects.create(
                customer_id=customer_id,
                username=username,
                payment_date=payment_date,
                customer_fee_paid=customer_fee_paid,
                staff_salary_paid=staff_salary_paid,
                rent_paid=rent_paid
            )

            return JsonResponse({'message': 'PaidAccount created successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            logger.exception("Error creating paid account")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)

@csrf_exempt
def get_paid_accounts(request):
    if request.method == 'GET':
        paid_accounts = PaidAccount.objects.all()

        data = []
        for paid_account in paid_accounts:
            data.append({
                'id': paid_account.id,
                "customer_id":paid_account.customer_id,
                'customer': paid_account.username,
                'payment_date': paid_account.payment_date,
                'customer_fee_paid': paid_account.customer_fee_paid,
                'staff_salary_paid': paid_account.staff_salary_paid,
                'rent_paid': paid_account.rent_paid
            })

        return JsonResponse({'paid_accounts': data})
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)
