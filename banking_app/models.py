from django.db import models
from accounts.models import AccountHolder
import uuid

class Account(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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

    class Action(models.Choices):
        Withdraw = 'Withdraw'
        Deposit = 'Deposit'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    action = models.CharField(max_length=8, choices=Action.choices)
    amount = models.PositiveIntegerField()
    balance = models.PositiveIntegerField(null=True)
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.description