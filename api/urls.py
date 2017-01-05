from django.conf.urls import include, url
from rest_framework_extensions.routers import ExtendedSimpleRouter
from . import views

todo_router = ExtendedSimpleRouter()
todo_router.register(r'lists', views.ListViewSet, base_name='lists').register(r'todos', views.TodoViewSet, base_name='lists-todos', parents_query_lookups=['list'])
# todo_router.register(r'todos', views.TodoViewSet, base_name='todos')
urlpatterns = [
    
    url(r'^$', views.index, name='index'),

    url('^api/', include(todo_router.urls)),
]