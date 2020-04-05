# Generated by Django 3.0.5 on 2020-04-04 02:42

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('banking_app', '0008_auto_20200404_0234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]