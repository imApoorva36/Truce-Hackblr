from django.contrib import admin
from .models import SME, LoanApplication, BusinessPlanEvaluation

class SMEAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'year', 'industry', 'address', 'cibil_score')

class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'sme', 'loan_type', 'no_of_dependents', 'income_annum', 'residential_assets_value', 'commercial_assets_value', 'luxury_assets_value', 'bank_asset_value', 'self_employed', 'loan_amount', 'loan_term', 'repay_prob', 'status', 'created_at', 'updated_at')

class BusinessPlanEvaluationAdmin(admin.ModelAdmin):
    list_display = ('id', 'loan_application', 'market_analysis_rating', 'business_model_rating', 'financial_projections_rating', 'management_team_rating', 'risk_assessment_rating', 'overall_score', 'feedback')

admin.site.register(SME, SMEAdmin)
admin.site.register(LoanApplication, LoanApplicationAdmin)
admin.site.register(BusinessPlanEvaluation, BusinessPlanEvaluationAdmin)