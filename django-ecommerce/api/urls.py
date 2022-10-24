from django.urls import path, include
from api import views
from rest_framework import routers
from api.views import *
from session.views import SessionAdminViewset

router_admin = routers.SimpleRouter()
router = routers.SimpleRouter()

router_admin.register('category', CategoryViewset,basename="category")
router_admin.register('address', AddressAdminViewset,basename="address")
router_admin.register('session', SessionAdminViewset,basename="session")
router_admin.register('product', ProductAdminViewset,basename="product")
router_admin.register('order', OrderAdminViewset,basename="order")
router_admin.register('order_item', OrderItemAdminViewset,basename="order_item")

router.register('category', CategoryViewset,basename="category")
router.register('address', AddressViewset,basename="address")
router.register('product', ProductAdminViewset,basename="product")
router.register('order', OrderPublicView,basename="order")

urlpatterns = [
    path('admin/', include(router_admin.urls)),
    path('', include(router.urls)),
    path('cart/', views.CartView().as_view()),
    path('cart/<int:pk>', views.CartDetailView().as_view()),
    path('payment/', PaymentView().as_view()),
    path('selected-address/', AddressSelectedView().as_view()),
    path('user/', UserPublicView().as_view()),
    path('stripe-webhook/', WebHookStripeView().as_view()),
]
