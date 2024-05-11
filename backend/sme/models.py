from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()
class SME(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='sme_profile')
    name = models.CharField(max_length=255)
    yoe = models.DateField()
    industry = models.CharField(max_length=100)
    address = models.CharField(max_length=30)
    cibil_score = models.IntegerField()	
    
class LoanApplication(models.Model):
    sme = models.ForeignKey(SME, on_delete=models.CASCADE, related_name='loan_applications')
    loan_type = models.CharField(choices=[
                                        ('term','Term Loan'),
                                        ('over_draft', 'Over Draft')
                                        ], default='term')
    no_of_dependents = models.IntegerField(default=0)
    income_annum = models.DecimalField(max_digits=15, decimal_places=2)
    residential_assets_value = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    commercial_assets_value = models.DecimalField(max_digits=15, decimal_places=2, default=0)	
    luxury_assets_value = models.DecimalField(max_digits=15, decimal_places=2, default=0)	
    bank_asset_value = models.DecimalField(max_digits=15, decimal_places=2, default=0)	
    self_employed = models.BooleanField(default=False)

    loan_amount = models.DecimalField(max_digits=15, decimal_places=2)
    loan_term = models.IntegerField()
    repay_prob = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    business_plan = models.TextField(max_length=500) 
    status = models.CharField(max_length=20, choices=[
                                                    ('pending', 'Pending'),
                                                    ('ml_approved', 'Auto Approved'),
                                                    ('ml_rejected', 'Auto Rejected'),
                                                    ('approved', 'Approved'),
                                                    ('rejected', 'Rejected')
                                                ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BusinessPlanEvaluation(models.Model):
    loan_application = models.OneToOneField(LoanApplication, on_delete=models.CASCADE, related_name='business_plan_evaluation')
    market_analysis_rating = models.IntegerField()
    business_model_rating = models.IntegerField()
    financial_projections_rating = models.IntegerField()
    management_team_rating = models.IntegerField()
    risk_assessment_rating = models.IntegerField()
    overall_score = models.DecimalField(max_digits=3, decimal_places=2)
    feedback = models.TextField(default='')