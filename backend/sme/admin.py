from django.contrib import admin
from .models import SME,LoanApplication,BusinessPlanEvaluation

admin.site.register(SME)
admin.site.register(LoanApplication)
admin.site.register(BusinessPlanEvaluation)