from django.urls import path,include
from .views import LatestProductsList,ProductDetail

urlpatterns = [
    path('latest-products/', LatestProductsList.as_view()),
    path('productsdetail/<slug:category_slug>/<slug:product_slug>/',ProductDetail.as_view()),
]
