from django.shortcuts import render
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json
from .serializers import UserDetailSerializer, UserCreateSerializer, UserPublicSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from api.utils import get_order
from api.serializers import AddressPublicSerializer

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


class Login(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if username is None or password is None:
            return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

        user = authenticate(username=username, password=password)

        if user is None:
            return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

        login(request, user)
        return JsonResponse({'detail': 'Successfully logged in.'})


class Logout(APIView):
    def get(self, request, format=None):
        if not request.user.is_authenticated:
            return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)
        logout(request)
        return JsonResponse({'detail': 'Successfully logged out.'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class Session(APIView):
    def get(self, request, format=None):
        if(request.user.is_authenticated):
            address =  AddressPublicSerializer(request.user.address).data if request.user.address is not None else None
            user = UserPublicSerializer(request.user).data
        else:
            address = None
            user = None
        if get_order(request) is not None:
            cartNumber = get_order(request).total_quantity
        else:
            cartNumber = 0
        return JsonResponse({'user':user,'address':address,'cartNumber':cartNumber})

class Register(CreateAPIView):
    serializer_class = UserCreateSerializer

