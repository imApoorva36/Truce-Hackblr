from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
# from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
# from .models import Team
from .serializer import SMESerializer,LoanApplicationSerializer,BusinessPlanEvaluationSerializer
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
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
from ai_stuff.llm_test import scores as llm_score
from django_nextjs.render import render_nextjs_page_sync
from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse
from weasyprint import HTML
def index(request):
    return render_nextjs_page_sync(request)
    
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

@permission_classes([IsAuthenticated])  # Add this line
@api_view(['POST'])
def sme_reg(request):
    # Assuming POST data contains SME registration information
    data = json.loads(request.body)
    user = request.user  # Assuming user is authenticated
    sme = SME.objects.create(
        user=user,
        name=data.get('name'),
        year=data.get('year'),
        industry=data.get('industry'),
        address=data.get('address'),
        cibil_score=data.get('cibil_score')
    )
    return JsonResponse({"message": "SME Registration successful"})

@permission_classes([IsAuthenticated])  # Add this line
@api_view(['POST'])
def sme_update(request):
    data = request.POST
    sme = request.user.sme_profile  # Assuming user is authenticated and associated with an SME profile
    if sme:
        sme.name = data.get('name', sme.name)
        sme.year = data.get('year', sme.year)
        sme.industry = data.get('industry', sme.industry)
        sme.address = data.get('address', sme.address)
        sme.cibil_score = data.get('cibil_score', sme.cibil_score)
        sme.save()
        return JsonResponse({"message": "SME Update successful"})
    else:
        return JsonResponse({"error": "SME profile not found"}, status=404)

@permission_classes([IsAuthenticated])  # Add this line
@api_view(['GET'])
def sme_getdata(request):
    sme_data = SME.objects.filter(user=request.user)
    serialized_data = SMESerializer(sme_data, many=True)
    return Response(serialized_data.data)


@permission_classes([IsAuthenticated])  # Add this line
@api_view(['POST'])
def auto_stage(request):
    
    sme_instance = request.user.sme_profile
    data = request.POST
    cibil_score = sme_instance.cibil_score
    ### stage 1 ###
    if cibil_score >= 700:
        loan = LoanApplication.objects.create(
            sme=sme_instance,
            no_of_dependents = data.get('no_of_dependents'),
            income_annum = data.get('income_annum'),
            cibil_score = sme_instance.cibil_score,
            residential_assets_value = data.get('residential_assets_value'),
            commercial_assets_value = data.get('commercial_assets_value'),
            luxury_assets_value = data.get('luxury_assets_value'),
            bank_asset_value = data.get('bank_asset_value'),
            self_employed = data.get('self_employed'),
            loan_amount = data.get('loan_amount'),
            loan_term = data.get('loan_term'),
            business_plan = data.get('business_plan')
                )
        loan_application.save()

    else:
        return JsonResponse({"message": "SME Registration Unsuccessful"})
    ### stage 2 ###
    loan_application = LoanApplication.objects.filter(sme=sme_instance).order_by('-created_at').first()

    sme_data = [loan_application.no_of_dependents, 
                loan_application.income_annum, 
                loan_application.loan_amount, 
                loan_application.loan_term, 
                sme_instance.cibil_score, 
                loan_application.residential_assets_value, 
                loan_application.commercial_assets_value, 
                loan_application.luxury_assets_value, 
                loan_application.bank_asset_value, 
                int(loan_application.self_employed)]
    output = pred_ml(sme_data)
    loan_application.repay_prob = output
    loan_application.save()
    if(output >= 0.8):
        loan_application.status = 'ml_approved'
        return JsonResponse({"message": f"Stage 2: Auto-Verification Approved -> {output}"})
    else:
        loan_application.status = 'ml_rejected'
        return JsonResponse({"message": f"Stage 2: Auto-Verification Failed -> {output}"})
    

@permission_classes([IsAuthenticated])  # Add this line
@api_view(['GET'])
def manual_stage(request):
    print(request.user)
    sme_instance = request.user.sme_profile

    loan_application = LoanApplication.objects.filter(sme=sme_instance).order_by('-created_at').first()
    combined_score, factor_score = llm_score(loan_application.business_plan)

    bp_eval = BusinessPlanEvaluation.objects.create(loan_application = loan_application,
                                                    market_analysis_rating = factor_score['Market Analysis and Opportunity'],
                                                    business_model_rating = factor_score['Business Model and Strategy'],
                                                    financial_projections_rating = factor_score['Financial Projections and Feasibility'],
                                                    management_team_rating = factor_score['Management Team and Experience'],
                                                    risk_assessment_rating = factor_score['Risk Assessment and Mitigation'],
                                                    overall_score = combined_score
                                                    )
    # Update LoanApplication status based on manual approval

    #loan_application.save()
    return JsonResponse({"message": f"Stage 3: Loan Processing"})


def generate_loan_approval_document(request, loan_id):
    loan = LoanApplication.objects.get(id=loan_id)
    context = {'loan': loan}
    html_content = render_to_string('sme/loan_approval_template.html', context)
    pdf_file = HTML(string=html_content).write_pdf()
    response = HttpResponse(pdf_file, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="loan_approval.pdf"'
    return response