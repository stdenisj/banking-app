# Generated by Django 3.0.5 on 2020-04-01 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banking_app', '0005_auto_20200401_1436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='id',
            field=models.UUIDField(default='9c23e99713034f9aaffe7429adfe750b', editable=False, primary_key=True, serialize=False),
        ),
    ]