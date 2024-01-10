from django.urls import path
from .views import AddToCartView ,RemoveFromCartView,ViewCartView

urlpatterns = [
    path('add', AddToCartView.as_view()),
    path('remove',RemoveFromCartView.as_view()),
    path('viewcart',ViewCartView.as_view())
]