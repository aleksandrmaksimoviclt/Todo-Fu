from django.db import models


class Board(models.Model):
    background_color = models.CharField(max_length=7)
    list = models.ForeignKey('List', null=True)
    name = models.TextField(null=True, blank=True)
    user = models.ForeignKey('User', null=True)

    def __str__(self):
        return self.name


class Label(models.Model):
    name = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class List(models.Model):
    name = models.TextField(null=True, blank=True)
    # todo = models.ForeignKey('Todo', null=True)

    def __str__(self):
        return self.name


class Todo(models.Model):
    due_date = models.DateTimeField(null=True)
    is_completed = models.BooleanField(default=False)
    label = models.ForeignKey('Label', null=True)
    list = models.ForeignKey('List', null=True)
    title = models.TextField(null=True)

    def __str__(self):
        return self.title


class User(models.Model):
    email_adress = models.EmailField(max_length=254, null=True)
    first_name = models.TextField(null=True)
    last_name = models.TextField(null=True)
    photo = models.ImageField(upload_to='user_profile_picture')

    def __str__(self):
        return self.first_name
