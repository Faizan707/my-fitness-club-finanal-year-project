# Generated by Django 4.2.7 on 2023-12-30 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0002_remove_workout_message'),
    ]

    operations = [
        migrations.CreateModel(
            name='Diet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('food_name', models.CharField(max_length=50)),
                ('quantity', models.CharField(max_length=50)),
            ],
        ),
    ]