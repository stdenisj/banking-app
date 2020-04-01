from django.db import models
from accounts.models import AccountHolder
import uuid

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4().hex, editable=False)
    title = models.CharField(max_length=100)
    balance = models.IntegerField(default=0)
    user = models.ForeignKey(AccountHolder, on_delete=models.CASCADE, related_name='accounts', null=True)

    def __str__(self):
        return self.title

    def get_balance(self):
        return self.balance

    def deposit(self, amount):
        if amount > 0:        
            self.balance += amount
        else:
            return 'Invalid input'

        return self.balance

    def withdraw(self, amount):
        if amount > 0:
            if amount <= self.balance:
                self.balance -= amount
                return self.balance
            else:
                return 'Insufficiant Funds'
        else:
            return 'Invalid input'

class Transaction(models.Model):
    description = models.CharField(max_length=200)
    amount = models.PositiveIntegerField()
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.description