from rest_framework import fields, serializers
from base.models import Event, Club, AUDIENCE_LIST, EVENT_STATE_LIST
from .models import BudgetProposal
from cc_admins.serializers import ClubSerializer
from django.utils import timezone


class EventSerializer(serializers.ModelSerializer):
    state = fields.ChoiceField(choices=EVENT_STATE_LIST, default="created")
    club = ClubSerializer(required=False)
    last_edited_by = serializers.CharField(default=serializers.CurrentUserDefault())

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Name can not be blank!")
        return value

    def validate_datetime(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Event can not be in the past!")
        return value

    def validate_audience(self, value):
        key_list = set(row[0] for row in AUDIENCE_LIST)
        val_list = set(value.split(","))
        if not val_list.issubset(key_list):
            raise serializers.ValidationError("Invalid audience!")
        return value

    def validate_venue(self, value):
        if not value:
            raise serializers.ValidationError("Venue can not be blank!")
        return value

    def validate_creator(self, value):
        if not value:
            raise serializers.ValidationError("Creator can not be blank!")
        return value

    def update(self, instance, validated_data):
        instance.last_edited_by = self.context["request"].user.username
        instance.name = validated_data.get("name")
        instance.datetime = validated_data.get("datetime")
        instance.audience = validated_data.get("audience")
        instance.venue = validated_data.get("venue")
        instance.creator = validated_data.get("creator")
        instance.state = validated_data.get("state")
        instance.duration = validated_data.get("duration")
        instance.save()
        return instance

    class Meta:
        model = Event
        fields = "__all__"


class BudgetProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetProposal
        fields = "__all__"
