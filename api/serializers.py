from rest_framework import serializers
from api.models import Board, Label, List, Todo, User


# class BoardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Board
#         fields = '__all__'


# class LabelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Label
#         fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

class ListSerializer(serializers.ModelSerializer):
    # todos = serializers.PrimaryKeyRelatedField(queryset=List.objects.all(), many=True)
    todos = TodoSerializer(many=True)

    class Meta:
        model = List
        fields = ('id', 'name', 'todos')





# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
