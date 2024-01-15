from rest_framework.serializers import ModelSerializer
from .models import note

class noteSerializer(ModelSerializer):
    class Meta:
        model = note
        fields = '__all__'
