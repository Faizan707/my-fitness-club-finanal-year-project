# Generated by Django 4.2.7 on 2023-12-08 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0009_alter_customer_customer_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='customer_id',
            field=models.IntegerField(null=True),
        ),
    ]