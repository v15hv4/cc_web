# Generated by Django 3.0.6 on 2020-07-10 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_auto_20200710_0255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='club',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.Club'),
        ),
    ]