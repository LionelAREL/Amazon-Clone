from django.urls import path
from authentification import views

urlpatterns = [
    path('register/', views.Register().as_view()),
    path('login/', views.Login().as_view()),
    path('logout/', views.Logout().as_view()),
    path('session/', views.Session().as_view()),
    path('tokenCSRF/', views.GetCSRFToken().as_view()),
]
