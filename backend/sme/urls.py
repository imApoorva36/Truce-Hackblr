from . import views
from .views import index
from django.urls import path, include
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # path("", index, name="index"),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', views.register, name='register'),
    path('api/logout/', views.custom_logout, name='custom_logout'),

    path('api/smereg', views.sme_reg, name="SME Registration"),
    path('api/smeupdate', views.sme_update, name="SME Update"),
    path('api/smedata',views.sme_getdata, name="SME Data fetch"),
    path('api/loandata',views.loan_getdata, name="Loan Data fetch"),
    path('api/allloandata', views.loan_get_all_data, name = "Loan All Data fetch"),
    path('api/auto_stage',views.auto_stage, name="Auto Stage"),
    path('api/loan_status',views.get_loan_status, name="Loan Status"),
    path('api/bank',views.bank_approval, name="Bank Dashboard"),
    path('api/bank/approve/<int:loan_application_id>', views.bank_approve, name='bank_approve'),
    path('api/bank/deny/<int:loan_application_id>', views.bank_reject, name='bank_deny'),


    path('api/print/<int:loan_id>/',views.generate_loan_approval_document,name="Print Loan PDF"),
    
]