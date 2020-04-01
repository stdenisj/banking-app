from django.contrib import admin
from accounts.models import AccountHolder
from .models import Account, Transaction

admin.site.register([Account, Transaction, AccountHolder])