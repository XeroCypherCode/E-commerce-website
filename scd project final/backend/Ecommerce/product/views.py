

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ProductSerializer
from .models import product, Category
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from django.db.models import Q
import logging
logger = logging.getLogger(__name__)
import threading

class LatestProducts(APIView):
   permission_classes = [permissions.AllowAny]
   def get(self, request, format=None):
       thread = threading.Thread(target=self.fetch_latest_products)
       thread.start()

   def fetch_latest_products(self):
       try:
           products = product.objects.all()[:4]
           serializer = ProductSerializer(products, many=True)
           return Response(serializer.data)
       except Exception as e:
           return self.handle_exception(e)
class LatestProductsList(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        try:
            products = product.objects.all()[:4]
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Exception as e:
            return self.handle_exception(e)

class BaseView(APIView):
    permission_classes = [permissions.AllowAny]

    def handle_exception(self, exception):
        # Improved handling of specific exceptions with proper HTTP status codes
        if isinstance(exception, product.DoesNotExist):
            return Response({"error": "Product does not exist"}, status=404)
        elif isinstance(exception, Category.DoesNotExist):
            return Response({"error": "Category does not exist"}, status=404)
        else:
            return Response({"error": "Something went wrong"}, status=500)

class ProductDetail(BaseView):
    def get(self, request, category_slug, product_slug, format=None):
        try:
            # Utilizing select_related for efficient database queries
            product_obj = product.objects.select_related('category').get(
                Q(category__slug=category_slug) & Q(slug=product_slug)
            )
            serializer = ProductSerializer(product_obj)
            return Response({'product': serializer.data})
        except Exception as e:
            return self.handle_exception(e)



from rest_framework.response import Response
class SearchProduct(APIView):
    def get(self, request, keyword, format=None):
        if keyword:
            products = product.objects.filter(name__icontains=keyword)
            if products.exists():
                logger.info(f"Found {len(products)} products")
                serializer=ProductSerializer(products, many=True)
                return Response(serializer.data, content_type='application/json', status=200)
            else:
                logger.info("No products found")
                return Response({'error':'product not found'}, content_type='application/json')
        else:
            logger.info("No keyword provided")
            return Response({"error": "Keyword parameter is missing or empty"}, content_type='application/json')