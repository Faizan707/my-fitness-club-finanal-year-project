from django.db import models

# Create your models here.
class Backup(models.Model):
        download_date = models.DateField()