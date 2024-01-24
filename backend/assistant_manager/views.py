# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import  ManagerAssistant,Instructor
import json


@csrf_exempt
def manager_assistant_list(request):
    if request.method == 'GET':
        manager_assistants = ManagerAssistant.objects.all()
        manager_assistant_list = [{'id': ma.id, 'name': ma.name,  'phone': ma.phone, 'ManagerAssistant_id': ma.ManagerAssistant_id} for ma in manager_assistants]
        return JsonResponse({'manager_assistants': manager_assistant_list})

    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            if not data:
                return JsonResponse({'error': 'Empty request body'}, status=400)

            manager_assistants = ManagerAssistant.objects.create(
                name=data['name'],
                phone=data['phone'],
                ManagerAssistant_id=data.get('ManagerAssistant_id') 
            )

            return JsonResponse({'message': 'Manager Assistant created successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def manager_assistant_detail(request, pk):
    try:
        manager_assistant = ManagerAssistant.objects.get(pk=pk)
    except ManagerAssistant.DoesNotExist:
        return JsonResponse({'error': 'Manager Assistant not found'}, status=404)

    if request.method == 'GET':
        manager_assistant_data = {'id': manager_assistant.id, 'name': manager_assistant.name,  'phone': manager_assistant.phone, 'ManagerAssistant_id': manager_assistant.ManagerAssistant_id}
        return JsonResponse(manager_assistant_data)

    elif request.method == 'PUT':
        try:
            data = json.loads(request.body.decode('utf-8'))
            if not data:
                return JsonResponse({'error': 'Empty request body'}, status=400)

            manager_assistant.name = data['name']
            manager_assistant.phone = data['phone']
            manager_assistant.ManagerAssistant_id = data.get('ManagerAssistant_id')  # Assuming ManagerAssistant_id is provided from the frontend
            manager_assistant.save()

            return JsonResponse({'message': 'Manager Assistant updated successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'DELETE':
        manager_assistant.delete()
        return JsonResponse({'message': 'Manager Assistant deleted successfully'})


@csrf_exempt
def instructor_list(request):
    if request.method == 'GET':
        instructors = Instructor.objects.all()
        instructor_data = [{'name': instructor.name,
                             'instructor_ID': instructor.instructor_ID,
                             'instructor_phone_no': instructor.instructor_phone_no,
                             'qualification': instructor.qualification,
                             'timings': instructor.timings} for instructor in instructors]
        return JsonResponse({'instructors': instructor_data}, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            instructor = Instructor.objects.create(
                name=data['name'],
                instructor_ID=data['instructor_ID'],
                instructor_phone_no=data['instructor_phone_no'],
                qualification=data['qualification'],
                timings=data['timings']
            )
            response_data = {
                'success': True,
                'message': 'Instructor created successfully',
                'instructor': {
                    'name': instructor.name,
                    'instructor_ID': instructor.instructor_ID,
                    'instructor_phone_no': instructor.instructor_phone_no,
                    'qualification': instructor.qualification,
                    'timings': instructor.timings,
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
                'message': f'Error creating instructor: {str(e)}',
            }
            return JsonResponse(response_data, status=500)

@csrf_exempt
def delete_instructor(request, instructor_id):
    try:
        # Get the Instructor object by ID
        instructor = Instructor.objects.get(id=instructor_id)
        instructor.delete()
        
        response_data = {
            'success': True,
            'message': 'Instructor deleted successfully',
        }
        return JsonResponse(response_data)
    except Instructor.DoesNotExist:
        response_data = {
            'success': False,
            'message': 'Instructor not found',
        }
        return JsonResponse(response_data, status=404)
    except Exception as e:
        response_data = {
            'success': False,
            'message': f'Error deleting instructor: {str(e)}',
        }
        return JsonResponse(response_data, status=500)