
from django.shortcuts import render, redirect
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import UserSerializer, TokenSerializer
from .models import AccountHolder
from django.contrib.auth import authenticate, login
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User, Group, PermissionsMixin


# JWT settings
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(generics.ListCreateAPIView):
    """
    POST user/login/
    """

    # This permission class will overide the global permission class setting
    # Permission checks are always run at the very start of the view, before any other code is allowed to proceed.
    # The permission class here is set to AllowAny, which overwrites the global class to allow anyone to have access to login.
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = AccountHolder.objects.all()


    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        AccountHolder = authenticate(request, username=username, password=password)
        if AccountHolder is not None:
            # login saves the user’s ID in the session,
            # using Django’s session framework.
            login(request, AccountHolder)
            refresh = RefreshToken.for_user(AccountHolder)
            serializer = TokenSerializer(data={
                # using DRF JWT utility functions to generate a token
                "token": str(refresh.access_token),
                "user": str(AccountHolder.id)
                })
            serializer.is_valid()
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)



class RegisterUsersView(generics.ListCreateAPIView):
    """
    POST user/signup/
    """
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = AccountHolder.objects.all()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        email = request.data.get("email", "")
        if not username and not password and not email:
            return Response(
                data={
                    "message": "username, password and email is required to register a user"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        new_user = AccountHolder.objects.create_user(
            username=username, password=password, email=email
        )
        my_group = Group.objects.get(name='AccountHolder')
        my_group.user_set.add(new_user)
        return Response(status=status.HTTP_201_CREATED)