from rest_framework import serializers
from .models import Account, Transaction

# class AccountSerializer(serializers.HyperlinkedModelSerializer):
#     transactions = serializers.HyperlinkedRelatedField(
#         view_name='transaction_detail',
#         many=True,
#         read_only=True
#     )
#     class Meta:
#         model = Account
#         fields = ('id', 'title', 'balance', 'transactions', 'user')

# class TransactionSerializer(serializers.HyperlinkedModelSerializer):
#     account = serializers.HyperlinkedRelatedField(
#         view_name='Account_detail',
#         many=False,
#         queryset=Account.objects.all()
#     )
#     class Meta:
#         model = Transaction
#         fields = ('id', 'description', 'amount', 'account', 'date')

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'action', 'description', 'amount', 'account', 'date', 'balance')


class AccountSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True, read_only=True)
    class Meta:
        model = Account
        fields = ('id', 'title', 'balance', 'transactions', 'user')