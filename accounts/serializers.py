from rest_framework import serializers
from .models import AccountHolder


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = AccountHolder
        
        fields = ('id', 'username', 'password', 'email', 'accounts', 'first_name', 'last_name')
        
class ReturnUserSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = AccountHolder
        
        fields = ('id', 'username', 'email', 'accounts', 'first_name', 'last_name')
        

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)
    user = serializers.CharField(max_length=20)