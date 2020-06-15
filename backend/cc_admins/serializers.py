from rest_framework import serializers
from auditlog.models import LogEntry
from base.models import Club, Coordinator


class LogSerializer(serializers.ModelSerializer):
    actor = serializers.ReadOnlyField(source="actor.username")

    class Meta:
        model = LogEntry
        fields = ["id", "object_pk", "actor", "action", "changes", "timestamp"]


class CoordinatorSerializer(serializers.ModelSerializer):
    clubs = serializers.SerializerMethodField()

    class Meta:
        model = Coordinator
        fields = "__all__"

    def get_clubs(self, obj):
        clubs = [club.name for club in Club.objects.filter(coordinators=obj.pk)]
        return clubs


class ClubSerializer(serializers.ModelSerializer):
    coordinators = CoordinatorSerializer(read_only=True, many=True)

    class Meta:
        model = Club
        fields = "__all__"
