from rest_framework import serializers
from .models import SME, LoanApplication, BusinessPlanEvaluation

class SMESerializer(serializers.ModelSerializer):
    class Meta:
        model = SME
        fields = '__all__'

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = '__all__'

class BusinessPlanEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessPlanEvaluation
        fields = '__all__'
