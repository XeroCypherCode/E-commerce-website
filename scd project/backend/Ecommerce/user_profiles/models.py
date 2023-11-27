from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
auth_user_model = settings.AUTH_USER_MODEL

# Create your models here.
# we r gooingg to create user profile model here


class Userprofile(models.Model):
    #linking userprofile to user
    user=models.OneToOneField(auth_user_model ,on_delete=models.CASCADE) #every user hha a single profile model that they re hooked up to
                                                            #and every userprofile is hooked uop to one user so its one to one relationship
                                                            #and then we pass in user to make connection and delete cascade is if a user 
                                                            #deleted the its profile should also b deleted
    first_name=models.CharField(default='', max_length=255)
    last_name=models.CharField(default='', max_length=255)
    phone=models.CharField(default='', max_length=20)
    address= models.CharField(default='', max_length=255)
    
    
    def __str__(self) :
        return self.first_name                             #simply returns first name
    


