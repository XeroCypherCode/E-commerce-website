from django.urls import path
from .views import signupview,getcsrftoken,loginview,logoutvies,checkauthenticationview,deleteaccountview,getuserview

urlpatterns = [
    path('register', signupview.as_view(), name='register'),
    path('csrf_cookie', getcsrftoken.as_view(), name='csrf_cookie'),
    path('authenticate', checkauthenticationview.as_view(), name='authenticate'),
    path('login', loginview.as_view(), name='login'),
    path('logout', logoutvies.as_view(), name='logout'),
    path('deleteAccount', deleteaccountview.as_view(), name='deleteAccount'),
    path('getuser', getuserview.as_view(), name='getuser')
]