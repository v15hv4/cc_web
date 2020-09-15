from django.utils import timezone
from django.db import models

AUDIENCE_LIST = [
    ["none", "-"],
    ["ug1", "UG 1"],
    ["ug2", "UG 2"],
    ["ug3", "UG 3"],
    ["ugx", "UG 4+"],
    ["pg", "PG"],
    ["staff", "Staff"],
    ["faculty", "Faculty"],
]

EVENT_STATE_LIST = [
    ["created", "CREATED"],
    ["approved", "APPROVED"],
    ["published", "PUBLISHED"],
    ["scheduled", "SCHEDULED"],
    ["completed", "COMPLETED"],
    ["deleted", "DELETED"],
]

CLUB_STATE_LIST = [["active", "ACTIVE"], ["deleted", "DELETED"]]


class Coordinator(models.Model):
    img = models.ImageField(upload_to="imgs/", blank=True, default="/imgs/user_placeholder.png")
    name = models.CharField(max_length=250)
    roles = models.TextField(blank=True, null=True)
    mail = models.EmailField()
    mobile = models.CharField(max_length=20)


class Club(models.Model):
    name = models.CharField(max_length=250)
    mail = models.EmailField()
    state = models.CharField(max_length=50, choices=CLUB_STATE_LIST, default="active")


class Event(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    datetime = models.DateTimeField()
    name = models.CharField(max_length=250)
    last_edited_by = models.CharField(max_length=250)
    venue = models.TextField()
    creator = models.CharField(max_length=250)
    audience = models.TextField()
    state = models.CharField(max_length=50, choices=EVENT_STATE_LIST, default="created")
    duration = models.CharField(max_length=100)


class EventLog(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    datetime = models.DateTimeField(default=timezone.now, blank=False, null=False)
    actor = models.CharField(max_length=250)
    action = models.IntegerField()

    @classmethod
    def create_event(cls, event):
        print(event)
        log = cls(event=event, club=event.club, actor=event.creator, action=0)
        return log

    @classmethod
    def update_event(cls, event):
        print(event)
        log = cls(event=event, club=event.club, actor=event.creator, action=1)
        return log

    @classmethod
    def delete_event(cls, event):
        print(event)
        log = cls(event=event, club=event.club, actor=event.creator, action=2)
        return log