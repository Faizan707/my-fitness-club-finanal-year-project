from django.http import JsonResponse
from .models import ManagerCredentials
import io
import json


def manager_api(request):
    try:
        manager_credentials = ManagerCredentials.objects.get()
        
        
        
        
        data = {'username': manager_credentials.username, 'password': manager_credentials.password}
        return JsonResponse(data)
    except ManagerCredentials.DoesNotExist:
        return JsonResponse({'error': 'Manager credentials not found'}, status=500)
