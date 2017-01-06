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
    id = serializers.ModelField(model_field=List()._meta.get_field('id'))
    todos = TodoSerializer(many=True, partial=True)


    class Meta:
        model = List
        fields = ('id', 'name', 'todos')

    # Write a .create() method to accept newly created todos
    # check if no duplicates are created

    # def create(self, instance, validated_data):
    #     todos_data = validated_data.pop('todos')

    #     if todos_data:
    #         for todo_data in todos_data:
    #             todo = Todo.objects.filter(id=todo_data['id'])
    #             if not todo:
    #                 Todo.objects.create(**todo_data)

    #     return instance


    def update(self, instance, validated_data):
        todos_data = validated_data.pop('todos')
        # import pdb; pdb.set_trace()
        if todos_data:
            for todo_data in todos_data:
                todo = Todo.objects.filter(id=todo_data['id'])
                if not todo:
                    Todo.objects.create(**todo_data)
                elif todo:
                    todo.update(**todo_data)

        return instance






# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
