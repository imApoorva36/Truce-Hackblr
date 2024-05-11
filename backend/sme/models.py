from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()
class SME(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='sme_profile')
    name = models.CharField(max_length=255)
    industry = models.CharField(max_length=100)
    address = models.CharField(max_length=30)


class LoanApplication(models.Model):
    sme = models.ForeignKey(SME, on_delete=models.CASCADE, related_name='loan_applications')
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    #nature of businessx
    #purpose = models.TextField()
    business_plan = models.CharField(max_length=500) # set a path for plans?
    status = models.CharField(max_length=20, choices=[
                                                    ('pending', 'Pending'),
                                                    ('ml_approved', 'ML Approved'),
                                                    ('ml_rejected', 'ML Rejected'),
                                                    ('approved', 'Approved'),
                                                    ('rejected', 'Rejected')
                                                ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)

class BusinessPlanEvaluation(models.Model):
    loan_application = models.OneToOneField(LoanApplication, on_delete=models.CASCADE, related_name='business_plan_evaluation')
    market_analysis_rating = models.IntegerField()
    business_model_rating = models.IntegerField()
    financial_projections_rating = models.IntegerField()
    management_team_rating = models.IntegerField()
    risk_assessment_rating = models.IntegerField()
    overall_score = models.DecimalField(max_digits=3, decimal_places=2)
    feedback = models.TextField()