from django.urls import path, include
from rest_framework import routers
from .views import LoginViewSet,  RefreshViewSet, UserAPIView


router = routers.DefaultRouter()

router.register('login', LoginViewSet, basename='auth-login')
router.register('refresh', RefreshViewSet, basename='auth-refresh')


urlpatterns = [
    path('user/', UserAPIView.as_view(), name='user'),
    path('', include(router.urls)),

]

