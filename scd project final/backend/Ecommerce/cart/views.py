from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import cart
from product.models import product
from accounts.models import CustomUser
from django.conf import settings
from .serializers import Cartserializers
from rest_framework.permissions import IsAuthenticated

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = self.request.user
        
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        try:
            user=CustomUser.objects.get(id=user.id)
            product_obj = product.objects.get(id=product_id)
        except product.DoesNotExist:
            return Response({'error':'product not found'},status=status.HTTP_404_NOT_FOUND)

        cart_obj = cart(user=user, Product=product_obj, quantity=quantity)
        cart_obj.save()

        return Response({'added': 'Product added to cart'}, status=status.HTTP_201_CREATED)
    
class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        product_id = request.data.get('product_id')
        try:
            cart_obj = cart.objects.get(user=request.user, Product__id=product_id)
            cart_obj.delete()
            return Response({'removed': 'Product removed from cart'}, status=status.HTTP_200_OK)
        except cart.DoesNotExist:
            return Response({'error':'product not found in cart'},status=status.HTTP_404_NOT_FOUND)

class ViewCartView(APIView):
   permission_classes = [IsAuthenticated]
   def get(self, request):
       cart_obj = cart.objects.filter(user=request.user)
       serialized_data = []
       for item in cart_obj:
           product_obj = product.objects.get(id=item.Product.id)
           serialized_data.append({
               'product_name': product_obj.name,
               'product_price': product_obj.price,
               'quantity': item.quantity,
              'product_image': product_obj.get_image() if product_obj.get_image else None
           })
       return Response(serialized_data, status=status.HTTP_200_OK)