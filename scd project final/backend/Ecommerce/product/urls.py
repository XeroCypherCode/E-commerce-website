from django.urls import path
from .views import LatestProductsList,ProductDetail,SearchProduct

urlpatterns = [
    path('latest-products/', LatestProductsList.as_view() ),
    path('productsdetail/<slug:category_slug>/<slug:product_slug>/',ProductDetail.as_view()),
    path('search/<str:keyword>/',SearchProduct.as_view())
]
