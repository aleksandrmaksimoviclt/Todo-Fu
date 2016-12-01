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

    $scope.editTodo = function($event, todo) {
        // var todo = $event.srcElement();
        var text = angular.element(angular.element(event.currentTarget).find('span')[0]);
        text.attr("contenteditable","true");
        // console.log(text);
        // event.target.
    }

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
        // .state('home.add-todo', {
        //     url: 'add-todo',
        //     templateUrl: 'assets/home/add-todo.template.html',
        //     controller: 'homeController'
        // });

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