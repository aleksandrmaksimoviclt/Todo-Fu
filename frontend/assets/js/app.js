var app = angular.module('todofu', [
    'ui.router',
]);
app.controller('homeController', function($scope, Todos, $state){
    
    $scope.newTodo = {};

    $scope.todos = Todos.all().then(function(res){
                        $scope.todos = res.data;
                   });

    $scope.addTodo = function() {
        Todos.addOne($scope.newTodo).then(function(){
            Todos.all().then(function(res){
                $scope.todos = res.data;
            });
        });
    };

    $scope.toggleCompleted = function(todo) {
        Todos.update(todo);
    };

    $scope.deleteTodo = function(id){
        Todos.delete(id);

        $scope.todos = $scope.todos.filter(function(todo){
            return todo.id !== id;
        })
    };

    Todos.all().then(function(res){
        $scope.todos = res.data;
    });
});
app.constant('BASE_URL', 'http://localhost:8000/api/todos/');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'assets/home/home.template.html',
            controller: 'homeController'
        });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});
app.service('Todos', function($http, BASE_URL){
    var Todos = {};

    Todos.all = function(){
        return $http.get(BASE_URL);
    };

    Todos.update = function(updatedTodo){
        return $http.put(BASE_URL + updatedTodo.id + '/', updatedTodo);
    };

    Todos.delete = function(id){
        return $http.delete(BASE_URL + id + '/');
    };

    Todos.addOne = function(newTodo){
        return $http.post(BASE_URL, newTodo)
    };

    return Todos;
    /**/
});
app.component('todoList', {
  templateUrl: './assets/todo-list/todo-list.template.html',
  controller: function TodoListController($scope) {
    $scope.tasks = [{
      text: 'Buy milk',
      done: false
    }];
    $scope.addTask = function() {
      $scope.tasks.push({
        'text': $scope.newTask,
        'done': false
      })
      $scope.newTask = ''
      document.getElementsByName("newTask")[0].focus()
    }
    $scope.removeCompleted = function() {
      $scope.tasks = $scope.tasks.filter(function(task) {
        return !task.done
      })
    }
  }
});

app.service('Todos', function($http, BASE_URL){
    var Todos = {};

    Todos.all = function(){
        return $http.get(BASE_URL);
    };

    Todos.update = function(updatedTodo){
        return $http.put(BASE_URL + updatedTodo.id + '/', updatedTodo);
    };

    Todos.delete = function(id){
        return $http.delete(BASE_URL + id + '/');
    };

    Todos.addOne = function(newTodo){
        return $http.post(BASE_URL, newTodo)
    };

    return Todos;
    /**/
});