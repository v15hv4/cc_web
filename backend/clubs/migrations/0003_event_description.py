# Generated by Django 3.0.6 on 2020-09-23 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clubs', '0002_eventlog'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='description',
            field=models.TextField(default='No description available.'),
        ),
    ]
