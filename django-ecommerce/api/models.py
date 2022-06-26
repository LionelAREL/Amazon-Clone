from django.db import models
from django.contrib.auth import get_user_model

class Category(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Address(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    address_line_1 = models.CharField(max_length=150)
    address_line_2 = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}-{self.address_line_1}({self.default})"

    class Meta:
        verbose_name_plural = 'Addresses'


class Product(models.Model):
    name = models.CharField(max_length=150)
    # image = models.ImageField(upload_to='product_images')
    description = models.TextField()
    price = models.PositiveIntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=False)
    category = models.ManyToManyField(Category)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), blank=True, null=True, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField(blank=True, null=True)
    ordered = models.BooleanField(default=False)
    receveid = models.BooleanField(default=False)
    address = models.ForeignKey(Address, on_delete=models.PROTECT,null=True,blank=True)

    def __str__(self):
        if self.user:
            return f"{self.user.username}({self.ordered})"
        else:
            return f"anonymous_user({self.ordered})"

    @property
    def total_order(self):
        total = sum([x.total_orderItem for x in self.orderItems.all()])
        return total

    @property
    def total_order_float(self):
        return "{:.2f}".format(self.total_order / 100)

    def is_valid(self):
        for orderItem in self.orderItems.all():
            if not orderItem.is_valid():
                return False
        return True

    @property
    def total_quantity(self):
        return sum([x.quantity for x in self.orderItems.filter(product__active=True)])


class OrderItem(models.Model):
    order = models.ForeignKey("Order", on_delete=models.CASCADE,related_name="orderItems")
    product = models.ForeignKey(Product, on_delete=models.CASCADE,related_name="orderItems")
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"orderItem:{self.product.name}({self.order.user})"

    def save(self, *args, **kwargs):
        if(self.quantity == 0):
            self.delete()
            return
        super().save(*args, **kwargs)

    def is_valid(self):
        if self.quantity <= self.product.stock:
            return True
        return False

    @property
    def total_orderItem(self):
        return self.quantity*self.product.price

    @property
    def total_orderItem_float(self):
        return "{:.2f}".format(self.total_orderItem/100)
