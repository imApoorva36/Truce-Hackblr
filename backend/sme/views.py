from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
# from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Team
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from .serializer import TeamsSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
# from django.contrib.auth import authenticate, login
from datetime import datetime, tzinfo
from django.utils.timezone import make_aware
from rest_framework.decorators import action
from django.http import JsonResponse
from django.contrib.auth import logout
from rest_framework.decorators import api_view, permission_classes


from django_nextjs.render import render_nextjs_page_sync
def index(request):
    return render_nextjs_page_sync(request)

class TeamsViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamsSerializer
    # permission_classes = [IsAuthenticated]
    def create(self,request): # Basically to handle POST Requests
        return Response("Nope",status=status.HTTP_404_NOT_FOUND)
    @action(detail=True, methods=['GET'])
    def team_detail(self, request, pk=None):
        team = self.get_object()  # Get the team instance
        serializer = self.get_serializer(team)  # Serialize the team data
        return Response(serializer.data)


    
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Add this line
def custom_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})

