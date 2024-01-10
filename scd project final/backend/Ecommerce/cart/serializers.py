from rest_framework import serializers
from .models import cart

class Cartserializers(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = '__all__'