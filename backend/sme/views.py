from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
# from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
# from .models import Team
# from .serializer import TeamsSerializer
from django.core.exceptions import ValidationError
from django.http import HttpResponse
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
import json
import jwt
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import SME, LoanApplication, BusinessPlanEvaluation
from ai_stuff.rf_test import pred as pred_ml
from django_nextjs.render import render_nextjs_page_sync
def index(request):
    return render_nextjs_page_sync(request)

# class TeamsViewSet(viewsets.ModelViewSet):
#     queryset = Team.objects.all()
#     serializer_class = TeamsSerializer
#     # permission_classes = [IsAuthenticated]
#     def create(self,request): # Basically to handle POST Requests
#         return Response("Nope",status=status.HTTP_404_NOT_FOUND)
#     @action(detail=True, methods=['GET'])
#     def team_detail(self, request, pk=None):
#         team = self.get_object()  # Get the team instance
#         serializer = self.get_serializer(team)  # Serialize the team data
#         return Response(serializer.data)


    
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Add this line
def custom_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})

@api_view(['POST'])
@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        if not (password and email):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        if User.objects.filter(username=email).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        try:
            user = User.objects.create_user(username=email, password=password)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        return JsonResponse({'message': 'User created successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def sme_reg(request):
    if request.method == 'POST':
        # Assuming POST data contains SME registration information
        data = request.POST
        user = request.user  # Assuming user is authenticated
        sme = SME.objects.create(
            user=user,
            name=data.get('name'),
            yoe=data.get('yoe'),
            industry=data.get('industry'),
            address=data.get('address'),
            cibil_score=data.get('cibil_score'),
            residential_assets_value=data.get('residential_assets_value', 0),
            commercial_assets_value=data.get('commercial_assets_value', 0),
            luxury_assets_value=data.get('luxury_assets_value', 0),
            bank_asset_value=data.get('bank_asset_value', 0),
            self_employed=data.get('self_employed', False)
        )
        return JsonResponse({"message": "SME Registration successful"})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def sme_update(request):
    if request.method == 'POST':
        data = request.POST
        sme = request.user.sme_profile  # Assuming user is authenticated and associated with an SME profile
        if sme:
            sme.name = data.get('name', sme.name)
            sme.yoe = data.get('yoe', sme.yoe)
            sme.industry = data.get('industry', sme.industry)
            sme.address = data.get('address', sme.address)
            sme.cibil_score = data.get('cibil_score', sme.cibil_score)
            sme.save()
            return JsonResponse({"message": "SME Update successful"})
        else:
            return JsonResponse({"error": "SME profile not found"}, status=404)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def sme_getdata(request):
    if request.method == 'GET':
        sme_data = SME.objects.filter(user=request.user)
        return JsonResponse({"data": list(sme_data)})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def stage1(request):
    if request.method == 'POST':
        sme = request.user.sme_profile
        cibil_score = sme.cibil_score  # Assuming CIBIL score is stored in SME model
        # Perform API call or calculation based on CIBIL score
        # Return appropriate response
        if cibil_score >= 700:
            loan_application = LoanApplication.objects.create(sme=sme)
            return JsonResponse({"message": "Stage 1: CIBIL score check passed"})
        else:
            return JsonResponse({"error": "Stage 1: CIBIL score check failed"})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def loan_application(request):
    if request.method == 'POST':
        # Assuming POST data contains SME registration information
        data = request.POST
        user = request.user  # Assuming user is authenticated
        sme_prof = request.user.sme_profile  # Assuming user is authenticated and associated with an SME profile
        loan = LoanApplication.objects.create(
            sme=sme_prof,
            no_of_dependents = data.get('no_of_dependents'),
            income_annum = data.get('income_annum'),
            #cibil_score = sme_prof.cibil_score,
            residential_assets_value = data.get('residential_assets_value'),
            commercial_assets_value = data.get('commercial_assets_value'),
            luxury_assets_value = data.get('luxury_assets_value'),
            bank_asset_value = data.get('bank_asset_value'),
            self_employed = data.get('self_employed'),
            loan_amount = data.get('loan_amount'),
            loan_term = data.get('loan_term'),
            business_plan = data.get('business_plan')
                )
        request.session['loan_application_id'] = loan.id
        return JsonResponse({"message": "Loan Application successful"})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def stage2(request):
    if request.method == 'POST':
        loan_application_id = request.session.get('loan_application_id')
        loan_application = get_object_or_404(LoanApplication, id=loan_application_id)

        # Perform ML evaluation based on model
        # Update LoanApplication status accordingly
        sme = request.user.sme_profile
        loan_application = a#Fill in
        # Perform ML evaluation and update LoanApplication status
        # For now, let's assume it's approved
        sme_data = [loan_application.no_of_dependents, 
                    loan_application.income_annum, 
                    loan_application.loan_amount, 
                    loan_application.loan_term, 
                    sme.cibil_score, 
                    loan_application.residential_assets_value, 
                    loan_application.commercial_assets_value, 
                    loan_application.luxury_assets_value, 
                    loan_application.bank_asset_value, 
                    loan_application.self_employed]
        output = pred_ml()
        loan_application.status = 'approved'
        loan_application.save()
        return JsonResponse({"message": "Stage 2: Loan application approved"})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def stage3(request):
    if request.method == 'POST':
        data = request.POST
        loan_application_id = data.get('loan_application_id')
        decision = data.get('decision')
        # Update LoanApplication status based on manual approval
        loan_application = LoanApplication.objects.get(id=loan_application_id)
        loan_application.status = decision
        loan_application.save()
        return JsonResponse({"message": f"Stage 3: Loan application {decision}"})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
