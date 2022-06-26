from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet
from .models import *
from .serializers import SessionSerializer
from rest_framework.permissions import IsAdminUser

# Create your views here.
class SessionAdminViewset(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = SessionSerializer
    queryset = CustomSession.objects.all()