# Generated by Django 3.0.6 on 2020-06-08 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_coordinator'),
    ]

    operations = [
        migrations.AddField(
            model_name='coordinator',
            name='img',
            field=models.ImageField(blank=True, upload_to='imgs/'),
        ),
    ]
