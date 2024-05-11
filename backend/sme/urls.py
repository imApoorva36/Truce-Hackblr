from . import views
from .views import index
from django.urls import path, include
from .views import index
from .api import router
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # path("", index, name="index"),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', views.register, name='register'),
    path('api/logout/', views.custom_logout, name='custom_logout'),
    path('api/', include(router.urls)),
]