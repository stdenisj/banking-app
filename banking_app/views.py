from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AccountSerializer, TransactionSerializer
from .models import Account, Transaction
from accounts.models import AccountHolder
from accounts.serializers import ReturnUserSerializer
from rest_framework_simplejwt import authentication
from accounts.models import AccountHolder
from rest_framework.decorators import action

class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer

    def get_queryset(self):
        return self.request.user.accounts.all()

class TransactionView(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return self.request.user.transactions.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = ReturnUserSerializer
    
    def get_queryset(self):
        return AccountHolder.objects.filter(id=self.request.user.id)