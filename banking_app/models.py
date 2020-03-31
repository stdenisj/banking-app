from django.db import models
import uuid

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.SafeUUID.hex, editable=False)
    title = models.CharField(max_length=100)
    balance = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')

    def __str__(self):
        self.title

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
    Amount = models.PositiveSmallIntegerField(max_value=7000)
    account = models.ForeignKey(Account, on_delete=CASCADE, related_name='transactions')
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.description