from django.db import models
from django.contrib.auth.models import User, Group, PermissionsMixin
# Create your models here.

class AccountHolder(User):
    class Meta:
        proxy = True
        