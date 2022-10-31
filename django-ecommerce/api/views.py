from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveUpdateAPIView
from .utils import *
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet
from .permissions import IsAdminOrReadOnly, AddressRequired, ArticleRequired
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import stripe
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from authentification.serializers import UserPublicEditSerializer
from rest_framework.decorators import action


"""
    Multi Serializer, Pagination
"""

class MultipleSerializerMixin:
    detail_serializer_class = None
    update_serializer_class = None
    def get_serializer_class(self):
        if hasattr(self, 'action') and self.action is not None:
            if self.action == 'retrieve' and self.detail_serializer_class is not None:
                return self.detail_serializer_class
            if self.action in ['update','partial_update'] and self.update_serializer_class is not None:
                return self.update_serializer_class
            if self.action in ['create'] and self.update_serializer_class is not None:
                return self.update_serializer_class
            else:
                return super().get_serializer_class()
        elif(self.request.method is not None):
            if self.request.method == 'GET' and self.detail_serializer_class is not None:
                return self.detail_serializer_class
            if self.request.method in ['PUT','PATCH','POST'] and self.update_serializer_class is not None:
                return self.update_serializer_class
            else:
                return super().get_serializer_class()
        else:
            if self.update_serializer_class is not None :
                return self.update_serializer_class
            if self.detail_serializer_class is not None:
                return self.detail_serializer_class
            else:
                return super().get_serializer_class()

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
                
"""
    Public/Authenticated View
"""

class UserPublicView(MultipleSerializerMixin, RetrieveUpdateAPIView):
    update_serializer_class = UserPublicEditSerializer
    serializer_class = UserPublicEditSerializer
    def get_object(self):
        return self.request.user

class OrderPublicView(MultipleSerializerMixin, ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailSerializer
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user,ordered=True)
    def get_object(self):
        return Order.objects.filter(user=self.request.user,ordered=False).first()

class CartView(MultipleSerializerMixin, ListCreateAPIView):
    update_serializer_class = OrderItemCreateSerializer
    serializer_class = OrderItemDetailSerializer
    def get_queryset(self):
        order = get_order(self.request)
        if order is None:
            return None
        return order.orderItems.all()

    
class CartDetailView(MultipleSerializerMixin, RetrieveUpdateDestroyAPIView):
    serializer_class = OrderItemDetailSerializer
    update_serializer_class = OrderItemCreateSerializer

    def get_object(self):
        order = get_order(self.request)
        orderItem = get_object_or_404(OrderItem,order=order,product__id=self.kwargs[self.lookup_field])
        return orderItem
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None :
            return Reponse({'detail':"error can't find object"},status = 400)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class AddressSelectedView(MultipleSerializerMixin,APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddressSerializer
    def get(self, request, *args, **kwargs):
        address = get_order(request).address
        if address is not None:
            serializer = AddressSerializer(address)
            return Response(serializer.data)
        return Response({'detail':"no Adress set"},status=400)
    
    def post(self, request, *args, **kwargs):
        address_id_selected = request.data['id']
        address_selected = get_object_or_404(Address,id=address_id_selected,user=request.user)
        Address.objects.filter(user=request.user).update(default=False)
        address_selected.default = True
        address_selected.save()
        order = get_order(request)
        order.address = address_selected
        order.save()
        return Response({'detail':f"address {address_id_selected} set to cart"})

class AddressViewset(MultipleSerializerMixin,ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AddressSerializer
    update_serializer_class = AddressCreateSerializer
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
        

    def destroy(self, request, pk=None):
        if pk is not None :
            adress = get_object_or_404(Address,id=pk,user=request.user)
            if(adress.default is False):
                adress.delete()
                return Response({'detail':"adresse destroy : " + pk },status = 200)
            else:
                return Response({'detail':"cannot delete default adresse" },status = 400)

            
        else :
            return Response({'detail':"error can't find adresse " + pk },status = 400)


"""
    Admin viewset
"""

class CategoryViewset(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

#address of user, change queryset
class AddressAdminViewset(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class ProductAdminViewset(MultipleSerializerMixin,ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = ["price","active","category"]
    search_fields = ["name"]
    pagination_class = StandardResultsSetPagination
    serializer_class = ProductSerializer
    update_serializer_class = ProductCreateSerializer
    queryset = Product.objects.all()


class OrderAdminViewset(MultipleSerializerMixin,ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class OrderItemAdminViewset(MultipleSerializerMixin,ModelViewSet):
    permission_classes = [IsAdminUser]
    update_serializer_class = OrderItemAdminSerializer
    serializer_class = OrderItemDetailSerializer
    queryset = OrderItem.objects.all()


"""
    Stripe Payment
"""

@method_decorator(csrf_exempt, name='dispatch')
class PaymentView(APIView):
    permission_classes = [IsAuthenticated,AddressRequired,ArticleRequired]
    def get(self, request, *args, **kwargs):
        try :
            stripe.api_key = 'sk_test_51KyVnpBtHPWEuLFwI33xUlMRcm2CY0WiFvtQt7D4tY8emMBAD0kK5s9aC0z1bN3c9bqAmBGVhPwWZN8KRbdeemRC00mxdVboJC'
            YOUR_DOMAIN = 'http://localhost:8000'
            order = get_or_set_order(request)
            items = [{
                        'price_data': {
                            'currency': 'eur',
                            'unit_amount': x.product.price,
                            'product_data': {
                                'name': x.product.name,
                                'images': [x.product.image.url],
                            },
                        },
                        'quantity': x.quantity
                    } for x in order.orderItems.all()]
            checkout_session = stripe.checkout.Session.create(
                line_items=items,
                metadata={'order_id': order.id},
                mode='payment',
                payment_intent_data={
                    'capture_method': 'manual',
                },
                success_url="https://www.amazon-lionel-arel.ga/cart",
                cancel_url="https://www.amazon-lionel-arel.ga/cart",
            )
            order.payment_id = checkout_session.stripe_id
            order.save()
            return Response({'payment_url':checkout_session.url})
        except Exception as e:
            return Response({'detail':f"{e}"})


@method_decorator(csrf_exempt, name='dispatch')
class WebHookStripeView(APIView):
    def post(self,request):
        stripe.api_key = 'sk_test_51KyVnpBtHPWEuLFwI33xUlMRcm2CY0WiFvtQt7D4tY8emMBAD0kK5s9aC0z1bN3c9bqAmBGVhPwWZN8KRbdeemRC00mxdVboJC'
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        event = None
        endpoint_secret = 'whsec_0e2e2ebe8a26f6477ae77c01f467cabb1cccb6db0f344846cab5650b33f0e561'
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except ValueError as e:
            # Invalid payload
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return HttpResponse(status=400)

        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            order = Order.objects.get(id=session['metadata']['order_id'])
            if order.is_valid():
                paymentIntent_id = session['payment_intent']
                intent = stripe.PaymentIntent.capture(
                    paymentIntent_id
                )
                refresh_quantity(order)
            else :
                paymentIntent_id = session['payment_intent']
                intent = stripe.PaymentIntent.capture(
                    paymentIntent_id,0
                )
                return HttpResponse(status=400)
        return HttpResponse(status=200)