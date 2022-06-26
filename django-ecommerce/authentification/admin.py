from django.contrib import admin
from django.contrib.auth import get_user_model
from api.models import *


admin.site.register(get_user_model())
admin.site.register([Category,Order,OrderItem,Address,Product])


