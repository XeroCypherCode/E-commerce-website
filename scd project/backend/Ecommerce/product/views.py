from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import ProductSerializer
from rest_framework.response import Response
from .models import product,Category
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from django.db.models import Q

    # template method is applied here to add similler methods togather 
    # because they are being called at different places at different time


class LatestProductsList(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        Products = product.objects.all()[0:4]
        serializer = ProductSerializer(Products, many=True)
        return Response(serializer.data)
    

class BaseView(APIView):
    permission_classes = [permissions.AllowAny]

    def handle_exception(self, exception):
        if isinstance(exception, product.DoesNotExist):
            return Response({"error": "Product does not exist"}, status=404)
        elif isinstance(exception, Category.DoesNotExist):
            return Response({"error": "Category does not exist"}, status=404)
        else:
            return Response({"error": "Something went wrong"}, status=500)

class ProductDetail(BaseView):
    def get(self, request, category_slug, product_slug, format=None):
        try:
            product_obj = product.objects.select_related('category').get(Q(category__slug=category_slug) & Q(slug=product_slug))
            serializer = ProductSerializer(product_obj)
            return Response({'product': serializer.data})
        except Exception as e:
            return self.handle_exception(e)
   
        
 
