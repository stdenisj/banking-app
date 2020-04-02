from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AccountSerializer, TransactionSerializer
from .models import Account, Transaction
from accounts.models import AccountHolder
from accounts.serializers import UserSerializer
from rest_framework_simplejwt import authentication
# from accounts.models import AccountHolder

class AccountView(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class TransactionView(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class UserView(viewsets.ModelViewSet):
    queryset = AccountHolder.objects.all()
    serializer_class = UserSerializer