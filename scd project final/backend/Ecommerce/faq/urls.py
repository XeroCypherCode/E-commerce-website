from django.urls import path
from . import views

urlpatterns = [
  path('api/faqs', views.get_faqs),
  path('get-faq-answer/', views.get_faq_answer),
]