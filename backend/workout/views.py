# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET,require_http_methods
from django.core.serializers import serialize
from .models import Workout,Diet
import json
@csrf_exempt
@require_POST
def create_workout(request):
    try:
        data = json.loads(request.body)
        workout = Workout.objects.create(
            customer_id=data['customer_id'],
            username=data['username'],
            workout_name=data['workout_name'],
            exercises_name=data['exercises_name'],
            sets=data['sets'],
            reps=data['reps']
        )
        response_data = {
            'success': True,
            'message': 'Workout created successfully',
            'workout': {
                'id': workout.id,
                'customer_id': workout.customer_id,
                'username': workout.username,
                'workout_name': workout.workout_name,
                'exercises_name': workout.exercises_name,
                'sets': workout.sets,
                'reps': workout.reps,
            }
        }
    except json.JSONDecodeError as e:
        response_data = {
            'success': False,
            'message': f'Error decoding JSON: {str(e)}',
        }
    except Exception as e:
        response_data = {
            'success': False,
            'message': f'Error creating workout: {str(e)}',
        }

    return JsonResponse(response_data)

@require_GET
def get_workouts(request):
    workouts = Workout.objects.all()
    data = {
        'workouts': json.loads(serialize('json', workouts))
    }
    return JsonResponse(data, safe=False)
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_workout(request, workout_id):
    try:
        workout = Workout.objects.get(id=workout_id)
        workout.delete()
        response_data = {
            'success': True,
            'message': 'Workout deleted successfully',
        }
    except Workout.DoesNotExist:
        response_data = {
            'success': False,
            'message': 'Workout not found',
        }
    except Exception as e:
        response_data = {
            'success': False,
            'message': f'Error deleting workout: {str(e)}',
        }

    return JsonResponse(response_data)
@csrf_exempt
@require_POST
def create_diet(request):
    try:
        data = json.loads(request.body)
        diet = Diet.objects.create(
            food_name=data['food_name'],
            quantity=data['quantity']
        )
        response_data = {
            'success': True,
            'message': 'Diet created successfully',
            'diet': {
                'id': diet.id,
                'food_name': diet.food_name,
                'quantity': diet.quantity,
            }
        }
    except json.JSONDecodeError as e:
        response_data = {
            'success': False,
            'message': f'Error decoding JSON: {str(e)}',
        }
    except Exception as e:
        response_data = {
            'success': False,
            'message': f'Error creating diet: {str(e)}',
        }

    return JsonResponse(response_data)

@require_GET
def get_diets(request):
    diets = Diet.objects.all()
    data = {
        'diets': json.loads(serialize('json', diets))
    }
    return JsonResponse(data, safe=False)
@csrf_exempt
@require_POST
def create_diet(request):
    try:
        data = json.loads(request.body)
        diet = Diet.objects.create(
            food_name=data['food_name'],
            quantity=data['quantity'],
            customer_id=data['customer_id'],
            username=data['username'],
        )
        response_data = {
            'success': True,
            'message': 'Diet created successfully',
            'diet': {
                'id': diet.id,
                'customer_id': diet.customer_id,
                'username': diet.username,
                'food_name': diet.food_name,
                'quantity': diet.quantity,
            }
        }
    except json.JSONDecodeError as e:
        response_data = {
            'success': False,
            'message': f'Error decoding JSON: {str(e)}',
        }
    except Exception as e:
        response_data = {
            'success': False,
            'message': f'Error creating diet: {str(e)}',
        }

    return JsonResponse(response_data)

@require_GET
def get_diets(request):
    diets = Diet.objects.all()
    data = {
        'diets': json.loads(serialize('json', diets))
    }
    return JsonResponse(data, safe=False)