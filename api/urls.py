from django.conf.urls import include, url
from rest_framework_nested import routers
from . import views

# todo_router = routers.DefaultRouter()
# todo_router.register(r'todos', views.TodoViewSet, base_name='todos')

# urlpatterns = [
#     # Send base.html to angular
#     url(r'^$', views.index, name='index'),

#     url('^api/', include(todo_router.urls)),
# ]

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, base_name='users')

user_router = routers.NestedSimpleRouter(router, r'users', lookup='user')
user_router.register(r'boards', views.BoardViewSet, base_name='boards')

boards_router = routers.NestedSimpleRouter(user_router, r'boards', lookup='board')
boards_router.register(r'lists', views.ListViewSet, base_name='lists')

lists_router = routers.NestedSimpleRouter(boards_router, r'lists', lookup='list')
lists_router.register(r'todos', views.TodoViewSet, base_name='todos')

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/', include(router.urls)),
    url(r'^api/', include(user_router.urls)),
    url(r'^api/', include(boards_router.urls)),
    url(r'^api/', include(lists_router.urls)),
]



# from django.conf.urls import include, url
# from rest_framework import routers
# from . import views

# todo_router = routers.DefaultRouter()
# todo_router.register(r'todos', views.TodoViewSet, base_name='todos')

# urlpatterns = [
#     # Send base.html to angular
#     url(r'^$', views.index, name='index'),

#     url('^api/', include(todo_router.urls)),
# ]