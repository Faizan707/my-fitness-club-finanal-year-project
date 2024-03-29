# Generated by Django 4.2.7 on 2023-12-27 03:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0013_alter_customer_customer_id'),
        ('accounts', '0003_accounts_customer'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaidAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_date', models.DateField()),
                ('amount_paid', models.DecimalField(decimal_places=2, max_digits=10)),
                ('customer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='customer.customer')),
            ],
        ),
    ]
