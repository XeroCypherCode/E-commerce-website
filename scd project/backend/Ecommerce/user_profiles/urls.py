from django.urls import path
from .views import getuserprofileview,updatprofile

urlpatterns = [
   path('userprofile',getuserprofileview.as_view(),name='userprofile'),
   path('updateuser',updatprofile.as_view(),name='updateuser') 
]