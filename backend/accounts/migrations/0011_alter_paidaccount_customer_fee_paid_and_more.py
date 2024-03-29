# Generated by Django 4.2.7 on 2023-12-31 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_remove_accounts_customer_remove_paidaccount_customer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paidaccount',
            name='customer_fee_paid',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='paidaccount',
            name='customer_id',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='paidaccount',
            name='username',
            field=models.CharField(max_length=255),
        ),
    ]
