from . import views
from .views import index
from django.urls import path, include
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # path("", index, name="index"),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', views.register, name='register'),
    path('api/logout/', views.custom_logout, name='custom_logout'),

    path('api/smereg', views.sme_reg, name="SME Registration"),
    path('api/smeupdate', views.sme_update, name="SME Update"),
    path('api/smedata',views.sme_getdata, name="SME Data fetch"),
    path('api/auto_stage',views.auto_stage, name="Auto Stage"),
    path('api/manual_stage',views.manual_stage, name="Manual Stage"),

]