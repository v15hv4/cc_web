from django.utils import timezone
from django.db import models

from clubs.models import Club


class Proposal(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    datetime = models.DateTimeField(default=timezone.now, blank=True, null=True)
    link = models.TextField(blank=True, null=True)
    pdf = models.FileField(blank=True, null=True)

