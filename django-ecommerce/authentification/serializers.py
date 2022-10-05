from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserDetailSerializer(serializers.ModelSerializer):
    allow_null = True
    class Meta:
        model = get_user_model()
        fields = ['id','email', 'first_name', 'last_name','last_login']

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id','email','password', 'first_name', 'last_name']
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = get_user_model()(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserPublicSerializer(serializers.ModelSerializer):
    allow_null = True
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name', 'last_name','last_login']

class UserPublicEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name', 'last_name']