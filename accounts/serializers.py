from rest_framework import serializers
from .models import AccountHolder


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = AccountHolder
        
        fields = ('username', 'password', 'email', 'accounts')
        

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)