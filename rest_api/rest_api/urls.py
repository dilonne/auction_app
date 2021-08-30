
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/user_auth/', include('user_auth.urls')),
    path('api/v1/', include('auction.urls')),
]
