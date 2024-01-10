from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin

class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password=None,**extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
    
        email = self.normalize_email(email)
        user=self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False) 
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)
    
class CustomUser(AbstractBaseUser,PermissionsMixin):
    
    email = models.EmailField(db_index=True,max_length=254, unique=True)
    password = models.CharField(max_length=254)
    
    is_active=models.BooleanField(default=True)
    is_superuser=models.BooleanField(default=False)
    is_staff =models.BooleanField(default=False)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    class Meta:
            verbose_name = 'user'
            verbose_name_plural = 'users'
