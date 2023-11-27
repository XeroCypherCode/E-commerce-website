from django.urls import path
from .views import text

urlpatterns = [
    path('text',text.as_view()),
]