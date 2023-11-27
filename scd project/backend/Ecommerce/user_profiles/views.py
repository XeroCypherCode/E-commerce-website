from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from accounts.models import CustomUser
from rest_framework import status
from .models import Userprofile
from .serializers import Userserializers


class getuserprofileview(APIView):
    def get(self, request ,formate=None):
        
            user = self.request.user
            email=user.email
            
            user=CustomUser.objects.get(id=user.id)
            
            user_profile = Userprofile.objects.get(user=user)
            user_profile = Userserializers(user_profile)
            
            return Response({'profile':user_profile.data, })
     
    
class updatprofile(APIView):
    def put(self, request, formate=None):
  
            user = self.request.user
            email = user.email
            data = self.request.data

            first_name = data['first_name']
            last_name = data['last_name']
            phone = data['phone']
            address = data['address']
            
            user_instance = CustomUser.objects.get(id=user.id)
            
            # Update the Userprofile
            Userprofile.objects.filter(user=user_instance).update(first_name=first_name, last_name=last_name, phone=phone, address=address)

            # Get the updated user profile
            user_profile = Userprofile.objects.get(user=user_instance)

            # Serialize the user profile
            serializer = Userserializers(user_profile)

            return Response({'profile': serializer.data, 'email': str(email)})
