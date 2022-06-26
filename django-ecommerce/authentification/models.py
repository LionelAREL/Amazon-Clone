from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    @property
    def address(self):
        from api.models import Address
        addresses = Address.objects.filter(user=self,default=True)
        if addresses.exists():
            return addresses[0]
        return None
        