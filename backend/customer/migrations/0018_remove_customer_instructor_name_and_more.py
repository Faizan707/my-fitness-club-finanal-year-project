# Generated by Django 4.2.9 on 2024-01-16 15:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0017_customer_instructor_name_customer_instructor_timing'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='instructor_name',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='instructor_timing',
        ),
    ]
