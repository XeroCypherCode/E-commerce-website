from rest_framework import serializers
from accounts.models import CustomUser

class Userserializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','email']
