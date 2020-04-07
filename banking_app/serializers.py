from rest_framework import serializers
from .models import Account, Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'action', 'description', 'amount', 'account', 'date', 'balance')


class AccountSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True, read_only=True)
    class Meta:
        model = Account
        fields = ('id', 'title', 'balance', 'transactions', 'user')