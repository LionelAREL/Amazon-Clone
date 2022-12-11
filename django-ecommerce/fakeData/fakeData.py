import requests
import json 

from api.models import Product
from api.models import Category

def getAllProducts():
    res = requests.get("https://dummyjson.com/products?limit=15")
    response = json.loads(res.text)['products']
    return response

def getAllImage(products):
    for product in products :
        if product['images'] and product['images'] is not [] :
            url = product['images'][0]
            nameImage = url.split("/")[-2] + "." + url.split(".")[-1]
            print(url,nameImage)
            response = requests.get(url)
            if response.status_code:
                fp = open("./fakeData/" + nameImage, 'wb')
                fp.write(response.content)
                fp.close()

def addAllCategories(products):
    alreadyExist =  [x[1] for x in list(Category.objects.values_list())]
    for product in products :
        if product['category'] not in alreadyExist :
            alreadyExist.append(product['category'])
            Category.objects.create(name=product['category'])

def addProducts(products):
    for product in products:
        url = product['images'][0]
        nameImage = url.split("/")[-2] + "." + url.split(".")[-1]
        category = Category.objects.get(name = product['category'])
        if len(Product.objects.filter(name = product['title'])) == 0:
            productCreate = Product.objects.create(image=nameImage,description=product['description'],price=int(product['price'])*100,active=True,stock=int(product['stock']),name=product['title'])
            productCreate.category.add(category)


products = getAllProducts()
getAllImage(products)
addAllCategories(products)
addProducts(products)

