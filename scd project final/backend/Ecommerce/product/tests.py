from django.test import TestCase, RequestFactory
from .views import LatestProductsList
from .models import product, Category
from .serializer import ProductSerializer

class LatestProductsListTest(TestCase):
    def setUp(self):
        #this is  Setup run before every test method.
        self.factory = RequestFactory()
        #category to create the instance of product
        self.category = Category.objects.create(name="Category 1", slug="category-1")
        self.prod1 = product.objects.create(category=self.category, name="Product 1", slug="product-1", price=100)
        self.prod2 = product.objects.create(category=self.category, name="Product 2", slug="product-2", price=200)

    def test_get(self):
        #instance of a GET request.
        request = self.factory.get('/')

        #Test LatestProductsList .
        response = LatestProductsList.as_view()(request)
        self.assertEqual(response.status_code, 200)

        #Test that the serialized data from the response
        #sould matches the expected result
        expected_data = ProductSerializer([self.prod1, self.prod2], many=True).data
        self.assertEqual(response.data, expected_data)
        
        #results
        #. indicates the test i spasssed
        #time will b shown
        #ok indicates tets passed
        #after that it will clean the teat fron database by saying(destroying test database for alies)