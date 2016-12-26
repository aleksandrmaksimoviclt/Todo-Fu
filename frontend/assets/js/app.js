var app = angular.module('todofu', [
    'ngAnimate',
    'angular-toArrayFilter',
    'ui.router'
]);
app.controller('homeController', function($scope, $state, Lists, Todos){

    $scope.newTodo = {};

    $scope.lists = Lists.all().then(function(res){
                        $scope.lists = res.data;
                    });

    $scope.getTodos = function(list){
        if (typeof list.id != 'undefined') {
            Todos.all(list.id).then(function(res){
                list.todos = res.data;
            });
        }
    };

    $scope.addTodo = function($event) {
        Todos.addOne($scope.newTodo).then(function($event){

            if ($event.status == 201) {
                $scope.todos.push($event.data);
                document.Form.newTask.value='';
                setFocus();
            } else {
                console.log('Error');
            }
        });
    };

    $scope.editTodo = function($event) {
        var text = angular.element(angular.element(event.currentTarget).find('span')[0]);
        $event.preventDefault();
        text.attr("contenteditable", "true");

        text[0].focus();

        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(text[0]);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(text[0]);
            textRange.collapse(false);
            textRange.select();
        }
    }

    $scope.stopEditTodo = function($index, $event, todo) {
        angular.element(event.currentTarget).removeAttr('contenteditable');
        console.log(angular.element(event.currentTarget).removeAttr('contenteditable'));
        titleBeforeEdit  = todo.title;
        todo.title = event.currentTarget.innerText;
        if (todo.title != titleBeforeEdit) {
            Todos.update(todo).then(function($event) {
                if ($event.status == 200) {
                    console.log($index);
                } else {
                    console.log($event.status);
                }
            });

        }
    }

    $scope.toggleCompleted = function(todo) {
        Todos.update(todo);
        dateNow = new Date();
        if (todo.is_completed) {
            lastCompletedDate = new Date();
            dayDifference = Math.abs(dateNow - lastCompletedDate);
            console.log(dayDifference);
            $scope.lastCompleted = lastCompletedDate.getHours() + ":" + lastCompletedDate.getMinutes();
        }
    };

    $scope.deleteTodo = function(id){
        Todos.delete(id);

        $scope.todos = $scope.todos.filter(function(todo) {
            return todo.id !== id;
        })
    };

    $scope.saveTodo = function($event, todo) {
        angular.element(event.currentTarget).removeAttr('contenteditable');
        console.log(todo);
    };

    // $scope.toggleCompletedDropdown = function(){
        
    // }
});

app.controller('cardComposerController', function($scope){
    
    $scope.toggleComposer = function(boolean) {
        $scope.hide = boolean;
        setTimeout(setFocus, 1)
    };
});
app.constant('LIST_URL', 'http://localhost:8000/api/lists/');
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
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    console.log(attrs.ngEnter);
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
app.service('Todos', function($http, BASE_URL, LIST_URL){
    var Todos = {};

    Todos.all = function(id){
        return $http.get(LIST_URL + id + '/todos/');
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

});

app.service('Lists', function($http, LIST_URL){
    var Lists = {};

    Lists.all = function(){
        return $http.get(LIST_URL);
    };

    Lists.update = function(updatedList){
        return $http.put(LIST_URL + updatedList.id + '/', updatedList);
    };

    Lists.delete = function(id){
        return $http.delete(LIST_URL + id + '/');
    };

    Lists.addOne = function(newList){
        return $http.post(LIST_URL, newList)
    };

    return Lists;

});
