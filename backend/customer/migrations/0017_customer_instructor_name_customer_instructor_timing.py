# Generated by Django 4.2.9 on 2024-01-15 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0016_customer_goal'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='instructor_name',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='instructor_timing',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
