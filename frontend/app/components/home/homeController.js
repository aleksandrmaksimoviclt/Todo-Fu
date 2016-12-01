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