# Generated by Django 4.2.9 on 2024-01-10 02:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backup', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='backup',
            old_name='action_time',
            new_name='download_date',
        ),
        migrations.RemoveField(
            model_name='backup',
            name='action_flag',
        ),
        migrations.RemoveField(
            model_name='backup',
            name='change_message',
        ),
        migrations.RemoveField(
            model_name='backup',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='backup',
            name='model_name',
        ),
        migrations.RemoveField(
            model_name='backup',
            name='object_id',
        ),
        migrations.RemoveField(
            model_name='backup',
            name='user',
        ),
    ]
