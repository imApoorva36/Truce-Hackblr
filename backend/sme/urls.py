from . import views
from .views import index
from django.urls import path, include
from .views import index
from .api import router
from django.conf import settings

urlpatterns = [
    # path("", index, name="index"),
    path('api/', include(router.urls)),
]