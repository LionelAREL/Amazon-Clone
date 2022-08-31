from rest_framework import serializers
from .models import Order, OrderItem, Product, Category, Address
from .utils import get_order, get_or_set_order

def unique_product(order):
    product = []
    for orderItem in order.orderItems.all():
        if orderItem.product.id in product:
            raise serializers.ValidationError('Multiple orderItem of the same product')
        product.append(orderItem.product.id)

def valid_order_item(data):
    if data['quantity'] > data['product'].stock:
            raise serializers.ValidationError('quantity to high')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class AddressPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['id','user']

class AddressCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address_line_1','address_line_2','city','zip_code','default']
    def create(self, validated_data):
        return Address.objects.create(**validated_data,user=self.context['request'].user)

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    class Meta:
        model = Product
        fields = '__all__'

class OrderItemValidation:
    def validate(self, data):
        order= get_order(self.context['request'])
        valid_order_item(data)
        return data

class OrderItemDetailSerializer(OrderItemValidation, serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['quantity', 'product']

class OrderItemAdminSerializer(OrderItemValidation, serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id','order','quantity', 'product']


class OrderItemCreateSerializer(OrderItemValidation, serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['quantity', 'product']

    def create(self, validated_data):
        order= get_or_set_order(self.context['request'])
        if order.orderItems.filter(product__id = validated_data['product'].id).exists():
            tempOrderItem = order.orderItems.get(product=validated_data['product'])
            tempOrderItem.quantity = validated_data['quantity'] + order.orderItems.filter(product__id = validated_data['product'].id).first().quantity
            if tempOrderItem.quantity > 25 :
                tempOrderItem.quantity= 25
            tempOrderItem.save()
            return tempOrderItem
        return OrderItem.objects.create(**validated_data,order=get_order(self.context['request']))

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','price','stock','category']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


