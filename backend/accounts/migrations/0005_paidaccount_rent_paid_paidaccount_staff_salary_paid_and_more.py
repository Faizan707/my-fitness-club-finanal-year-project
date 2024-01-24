# Generated by Django 4.2.7 on 2023-12-27 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_paidaccount'),
    ]

    operations = [
        migrations.AddField(
            model_name='paidaccount',
            name='rent_paid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='paidaccount',
            name='staff_salary_paid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='paidaccount',
            name='amount_paid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]