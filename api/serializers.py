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
    id = serializers.ModelField(model_field=Todo()._meta.get_field('id'))

    class Meta:
        model = Todo
        fields = ('id', 'due_date', 'is_completed', 'label', 'list', 'title')

class ListSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, partial=True)


    class Meta:
        model = List
        fields = ('id', 'name', 'todos')


    def update(self, instance, validated_data):
        todos_data = validated_data.pop('todos')
        
        # list_name = Album.objects.create(**validated_data)
        for todo_data in todos_data:
            todo = Todo.objects.filter(id=todo_data['id'])
            todo.update(**todo_data)
        return instance






# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
