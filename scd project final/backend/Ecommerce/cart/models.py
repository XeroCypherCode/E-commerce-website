from django.db import models
from django.conf import settings
auth_user_model = settings.AUTH_USER_MODEL
from product.models import product
# Create your models here.

class cart(models.Model):

    user=models.ForeignKey(auth_user_model, on_delete=models.CASCADE)
    Product=models.ForeignKey(product, on_delete=models.CASCADE)
    quantity=models.IntegerField(null=False,blank=False)
    date_added = models.DateTimeField(auto_now_add=True)