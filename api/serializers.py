from rest_framework import serializers
from api.models import Todo


# class BoardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = 


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
