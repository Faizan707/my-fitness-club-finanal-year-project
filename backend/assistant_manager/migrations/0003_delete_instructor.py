# Generated by Django 4.2.7 on 2023-12-23 03:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('assistant_manager', '0002_instructor_instructor_id_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Instructor',
        ),
    ]