# api.py
from rest_framework import routers
from .views import TeamsViewSet
router = routers.DefaultRouter()
router.register(r'teams', TeamsViewSet)