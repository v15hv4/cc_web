# Generated by Django 3.0.6 on 2020-08-12 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0027_auto_20200812_2103'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='link',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
