# views.py
from rest_framework import generics
from .models import Backup
from .serializers import BackupSerializer

class BackupListCreateView(generics.ListCreateAPIView):
    queryset = Backup.objects.all()
    serializer_class = BackupSerializer
