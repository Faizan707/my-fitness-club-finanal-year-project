# Generated by Django 4.2.7 on 2024-01-03 02:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Reports', '0002_profit'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rent',
            name='description',
        ),
        migrations.RemoveField(
            model_name='salary',
            name='description',
        ),
    ]