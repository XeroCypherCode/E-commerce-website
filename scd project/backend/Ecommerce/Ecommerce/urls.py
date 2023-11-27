from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView



urlpatterns = [
 path('admin/',admin.site.urls),
 path('api-auth/',include('rest_framework.urls')),
 path('accounts/',include('accounts.urls')),                      #path for accounts
 path('user_profiles/',include('user_profiles.urls')),             #path for user_profiles
 path('cart/',include('cart.urls')),
 path('products/',include('product.urls'))
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns +=[re_path(r'^.*',TemplateView.as_view(template_name='index.html'))] 
#build folder when build react application