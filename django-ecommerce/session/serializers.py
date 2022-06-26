from .models import *
from rest_framework import serializers

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomSession
        fields = '__all__'