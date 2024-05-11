from django.contrib import admin
from .models import Team
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'name', 'contact', 'calculate_score', 'member1','member2','member3')
    def calculate_score(self,obj):
        return obj.calculate_score()
    calculate_score.short_description = 'User Score'

admin.site.register(Team,TeamAdmin)