from django.contrib import auth
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from user_profiles.models import Userprofile
from .serializers import Userserializers
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from accounts.models import CustomUser
from .fromateValidator import EmailValidationStrategy
import re 

     # here is the userprofile factory which encapsulates the userprofile object 
class UserProfileFactory: 
    def create_user_profile(self, user_id, first_name, last_name, phone, address):
        return Userprofile.objects.create(user_id=user_id, first_name=first_name, last_name=last_name, phone=phone, address=address)
    
@method_decorator(csrf_protect,name='dispatch') 
class checkauthenticationview(APIView):
    def get(self, request, format=None):
        isauthenticated = CustomUser.is_authenticated
        try:
            if isauthenticated:
                return Response({'isauthenticated': 'successfully'})
            else:
                return Response({'isauthenticated': 'error'})
        except:
            return Response({'error': 'something went wrong while checking authentication'})
      
@method_decorator(csrf_protect,name='dispatch')       #this will ensure that we need a csrf tooken to actuly access the signup view      
class signupview(APIView):
    permission_classes=(permissions.AllowAny,)
    
    def post(self, request, format=None):
        data = self.request.data
        email=data['email']
        password=data['password']
        re_password=data['re_password']
        
        if password == re_password:
            try: 
                validator = EmailValidationStrategy() # Validate email format
                if not validator.validate(email):
                    return Response({'errorformate': 'Invalid email format'})
                
                if CustomUser.objects.filter(email=email).exists():
                    return Response({'exists': 'email already exists'})
                
                if len(password) < 6:
                    return Response({'error': 'password should be greater than 6 characters'})
                
                user = CustomUser.objects._create_user(email=email, password=password)
                user.save()
                user_profile_factory = UserProfileFactory()
                user_profile = user_profile_factory.create_user_profile(user.id, '', '', '', '')
                user_profile.save()
                
                return Response({'success': 'user created successfully'})  # Signup successful
            except Exception as e:
                return Response({'error': f'something went wrong when registering - {str(e)}'})
        else:
            return Response({'error': 'passwords do not match'})


@method_decorator(csrf_protect,name='dispatch') 
class loginview(APIView):
    permission_classes=(permissions.AllowAny,)
     
    def post(self, request, format=None):
        data=self.request.data 
        email=data['email']
        password=data['password']
        user=auth.authenticate(email=email,password=password)
        validator = EmailValidationStrategy()
        try:
            if not validator.validate(email):
                return Response({'errorformate': 'Invalid email format'})
            if user is not None:
                auth.login(request,user)
                return Response({'success': 'user authenticated and loged in', 'email': email})
            else:
                return Response({'error':'user not aunthenticated'})
        except:
                return Response({'error':'something went wrong when loging in'})

@method_decorator(csrf_protect,name='dispatch') 
class logoutvies(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success':'user loged out'})
        except:
            return Response({'error':'something went wrong when loged out'})
        
@method_decorator(ensure_csrf_cookie,name='dispatch')
class getcsrftoken(APIView):
    permission_classes=(permissions.AllowAny,)
    
    def get(self, request, format=None):
        return Response({'success':'csrf cookie set'})
    
@method_decorator(csrf_protect,name='dispatch') 
class deleteaccountview(APIView):
    def delete(self, request, format=None):
        user = self.request.user                                #this line retrieves the authenticated user making the DELETE request.                       
                                                                #thhe get() will return only the specific id(pk) from database if present
                                                                #filter was not accurate becuse it returns the set of querry based on specific conditions so get should bused here
        try:
            user_to_delete = CustomUser.objects.get(pk=user.id)     #pk is primary key in database due to which that specific user object will be retrived
            user_to_delete.delete()                                 #this will delete the user object retrived 
            return Response({"success": "Account deleted successfully"})
        except User.DoesNotExist:                               #its the exception that user id (pk) dosent exists in database
            return Response({"error": "User not found"})
        except Exception as e:
            return Response({"error": "Something went wrong while deleting account"})
        
class getuserview(APIView):
    permission_classes=(permissions.AllowAny,)
    
    def get(self, request, format=None):
        users=CustomUser.objects.all()
        users=Userserializers(users,many=True)
        return Response(users.data)
    

   