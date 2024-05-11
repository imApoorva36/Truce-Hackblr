from django.urls import path
from . import views
from .views import index
from django.conf import settings

urlpatterns = [
    path("", index, name="index"),
# path('', views.getData),
# path('post/', views.postData),
]