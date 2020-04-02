from django.db import models
from django.contrib.auth.models import User, Group, PermissionsMixin
# Create your models here.

class AccountHolder(User):
    # def __str__(self):
    #     return str(self.id)

    class Meta:
        proxy = True
        