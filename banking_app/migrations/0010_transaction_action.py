# Generated by Django 3.0.5 on 2020-04-04 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banking_app', '0009_auto_20200404_0242'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='action',
            field=models.IntegerField(choices=[(1, 'Withdraw'), (2, 'Deposit')], null=True),
        ),
    ]
