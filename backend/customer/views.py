from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Customer
import json

@csrf_exempt
def customer_api(request, customer_id=None):
    if request.method == 'GET':
        if customer_id:
            customer = get_object_or_404(Customer, pk=customer_id)
            customer_data = {
                'username': customer.username,
                'email': customer.email,
                'bmi': customer.bmi,
                'height_inches': customer.height_inches,
                'height_feet': customer.height_feet,
                'customer_id': customer.customer_id,
                "weight":customer.weight,
                "goal":customer.goal,
                "instructor_name":customer.instructor_name,
                "instructor_timing":customer.instructor_timing
            }
            return JsonResponse(customer_data)
        else:
            customers = Customer.objects.all()
            customer_data = [{'username': customer.username, 'email': customer.email, 'bmi': customer.bmi,'weight':customer.weight,
                              'height_inches': customer.height_inches, 'height_feet': customer.height_feet, 'customer_id': customer.customer_id ,"goal":customer.goal,"instructor_name":customer.instructor_name,"instructor_timing":customer.instructor_timing} for customer in customers]
            return JsonResponse(customer_data, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            customer_id = data.get('customer_id')

            new_customer = Customer.objects.create(
                username=username,
                customer_id=customer_id,
                email=data['email'],
                bmi=data.get('bmi', None),
                height_inches=data.get('height_inches', None),
                height_feet=data.get('height_feet', None),
                weight = data.get("weight",None),
                goal =data.get("goal",None),
                instructor_name=data.get("instructor_name",None),
                instructor_timing=data.get("instructor_timing",None)
                
            )

            response_data = {
                'message': 'Customer registered successfully.',
                'username': new_customer.username,
                'email': new_customer.email,
                'bmi': new_customer.bmi,
                'height_inches': new_customer.height_inches,
                'height_feet': new_customer.height_feet,
                'customer_id': new_customer.id,
                "weight":new_customer.weight,
                "goal":new_customer.goal,
                "instructor_name":new_customer.instructor_name,
                "instructor_timing":new_customer.instructor_timing
                
            }

            return JsonResponse(response_data)
        except ValueError as ve:
            return JsonResponse({'error': f'Invalid data format: {ve}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'DELETE':
        try:
            if customer_id:
                customer = get_object_or_404(Customer, customer_id=customer_id)
                customer.delete()
                return JsonResponse({'message': 'Customer deleted successfully.'})
            else:
                return JsonResponse({'error': 'No customer_id provided for deletion.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
