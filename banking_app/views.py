from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import AccountSerializer, TransactionSerializer
from .models import Account, Transaction
# from django.contrib.auth.User import request

class AccountView(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class TransactionView(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
