# Generated by Django 4.2.7 on 2023-12-08 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0007_remove_customer_height_in_inches_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='customer_id',
            field=models.CharField(blank=True, max_length=255, unique=True),
        ),
    ]
