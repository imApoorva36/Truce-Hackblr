from rest_framework import serializers
from .models import Team
from django.contrib.auth import get_user_model
from rest_framework import status
class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('name','member1','member2','member3',)