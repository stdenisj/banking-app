# Generated by Django 3.0.5 on 2020-04-05 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banking_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='balance',
            field=models.PositiveIntegerField(default=0),
        ),
    ]