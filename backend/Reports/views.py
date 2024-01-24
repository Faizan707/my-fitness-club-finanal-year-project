# views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
import json
from .models import CustomerReports,MonthlyBill,Salary,Rent,Profit

@csrf_exempt
def customer_reports(request, report_id=None):
    if request.method == 'GET':
        if report_id is not None:
            try:
                report = CustomerReports.objects.get(id=report_id)
                report_data = {
                    'id': report.id,
                    'username': report.username,
                    'customer_id': report.customer_id,
                    'fitness_level': report.fitness_level,
                    'improvement': report.improvement,
                }
                return JsonResponse({'customer_report': report_data})
            except CustomerReports.DoesNotExist:
                return JsonResponse({'error': f'Customer report with id {report_id} not found'}, status=404)
        else:
            reports = list(CustomerReports.objects.values())
            return JsonResponse({'customer_reports': reports}, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            report = CustomerReports.objects.create(
                username=data['username'],
                customer_id=data['customer_id'],
                fitness_level=data['fitness_level'],
                improvement=data['improvement']
            )
            response_data = {
                'success': True,
                'message': 'Customer report created successfully',
                'report': {
                    'id': report.id,
                    'username': report.username,
                    'customer_id': report.customer_id,
                    'fitness_level': report.fitness_level,
                    'improvement': report.improvement,
                }
            }
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            response_data = {
                'success': False,
                'message': f'Error decoding JSON: {str(e)}',
            }
            return JsonResponse(response_data, status=400)
        except Exception as e:
            response_data = {
                'success': False,
                'message': f'Error creating customer report: {str(e)}',
            }
            return JsonResponse(response_data, status=500)

    elif request.method == 'DELETE':
        if report_id is not None:
            try:
                report = CustomerReports.objects.get(id=report_id)
                report.delete()
                response_data = {
                    'success': True,
                    'message': f'Customer report with id {report_id} deleted successfully',
                }
                return JsonResponse(response_data)
            except CustomerReports.DoesNotExist:
                response_data = {
                    'success': False,
                    'message': f'Customer report with id {report_id} does not exist',
                }
                return JsonResponse(response_data, status=404)
            except Exception as e:
                response_data = {
                    'success': False,
                    'message': f'Error deleting customer report: {str(e)}',
                }
                return JsonResponse(response_data, status=500)
        else:
            response_data = {
                'success': False,
                'message': 'Missing report_id in the request',
            }
            return JsonResponse(response_data, status=400)

@csrf_exempt
def monthly_bills(request):
    if request.method == 'GET':
        bills = list(MonthlyBill.objects.values())
        return JsonResponse({'monthly_bills': bills}, safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            bill = MonthlyBill.objects.create(
                date=data['date'],
                amount=data['amount']
            )
            response_data = {
                'success': True,
                'message': 'Monthly bill created successfully',
                'bill': {
                    'id': bill.id,
                    'date': bill.date,
                    'amount': bill.amount,
                }
            }
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            response_data = {
                'success': False,
                'message': f'Error decoding JSON: {str(e)}',
            }
            return JsonResponse(response_data, status=400)
        except Exception as e:
            response_data = {
                'success': False,
                'message': f'Error creating monthly bill: {str(e)}',
            }
            return JsonResponse(response_data, status=500)
        
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_monthly_bill(request, bill_id):
    try:
        bill = MonthlyBill.objects.get(id=bill_id)
        bill.delete()
        response_data = {
            'success': True,
            'message': 'Monthly bill deleted successfully',
        }
    except MonthlyBill.DoesNotExist:
        response_data = {
            'success': False,
            'message': 'Monthly bill not found',
        }
    except Exception as e:
        response_data = {
            'success': False,
            'message': f'Error deleting monthly bill: {str(e)}',
        }

    return JsonResponse(response_data)


@csrf_exempt
def salaries(request, salary_id=None):
    if request.method == 'GET':
        if salary_id is not None:
            salary = get_object_or_404(Salary, id=salary_id)
            return JsonResponse({'date': salary.date, 'amount': salary.amount})

        else:
            salaries_data = list(Salary.objects.values())
            return JsonResponse({'salaries': salaries_data}, safe=False)

    elif request.method == 'POST':
        # Assuming request.body contains JSON data with 'date' and 'amount'
        data = json.loads(request.body)
        salary = Salary.objects.create(date=data['date'], amount=data['amount'])
        return JsonResponse({'success': True, 'message': 'Salary created successfully'})

    elif request.method == 'DELETE':
        try:
            salary = get_object_or_404(Salary, id=salary_id)
            salary.delete()
            return JsonResponse({'success': True, 'message': 'Salary deleted successfully'})

        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error deleting salary: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)




@csrf_exempt
def rents(request, rent_id=None):
    if request.method == 'GET':
        rents_list = list(Rent.objects.values())
        return JsonResponse({'rents': rents_list}, safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            rent = Rent.objects.create(
                date=data['date'],
                amount=data['amount']
            )
            response_data = {
                'success': True,
                'message': 'Rent entry created successfully',
                'rent': {
                    'id': rent.id,
                    'date': rent.date,
                    'amount': rent.amount,
                }
            }
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            response_data = {
                'success': False,
                'message': f'Error decoding JSON: {str(e)}',
            }
            return JsonResponse(response_data, status=400)
        except Exception as e:
            response_data = {
                'success': False,
                'message': f'Error creating rent entry: {str(e)}',
            }
            return JsonResponse(response_data, status=500)
    elif request.method == 'DELETE':
        try:
            rent = get_object_or_404(Rent, id=rent_id)
            rent.delete()

            response_data = {
                'success': True,
                'message': 'Rent entry deleted successfully',
            }
            return JsonResponse(response_data)
        except Exception as e:
            response_data = {
                'success': False,
                'message': f'Error deleting rent entry: {str(e)}',
            }
            return JsonResponse(response_data, status=500)
@csrf_exempt
def profits(request, profit_id=None):
    if request.method == 'GET':
        profits_list = list(Profit.objects.values())
        return JsonResponse({'profits': profits_list}, safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            profit = Profit.objects.create(
                daily_profit=data['daily_profit'],
                monthly_profit=data['monthly_profit'],
                yearly_profit=data['yearly_profit'],
            )
            response_data = {
                'success': True,
                'message': 'Profit entry created successfully',
                'profit': {
                    'id': profit.id,
                    'daily_profit': profit.daily_profit,
                    'monthly_profit': profit.monthly_profit,
                    'yearly_profit': profit.yearly_profit,
                }
            }
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            response_data = {
                'success': False,
                'message': f'Error decoding JSON: {str(e)}',
            }
            return JsonResponse(response_data, status=400)
        except Exception as e:
            response_data = {
                'success': False,
                'message': f'Error creating profit entry: {str(e)}',
            }
            return JsonResponse(response_data, status=500)

    elif request.method == 'DELETE':
        try:
            profit = get_object_or_404(Profit, id=profit_id)
            profit.delete()

            response_data = {
                'success': True,
                'message': 'Profit entry deleted successfully',
            }
            return JsonResponse(response_data)
        except Exception as e:
            response_data = {
                'success': False,
                'message': f'Error deleting profit entry: {str(e)}',
            }
            return JsonResponse(response_data, status=500)

