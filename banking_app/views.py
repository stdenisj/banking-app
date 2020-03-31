from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AccountSerializer, TransactionSerializer
from .models import Account, Transaction

class AccountView(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class TransactionView(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer