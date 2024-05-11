from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
class Team(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, null=True, blank=True)
    member1 = models.CharField(max_length=30, null=True, blank=True)
    member2 = models.CharField(max_length=30, null=True, blank=True)
    member3 = models.CharField(max_length=30, null=True, blank=True)
    contact = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"{self.id} - {self.user} - {self.name}"