app.controller('homeController', function($scope, $state, $window, Lists, Todos){

    $scope.newTodo = {};

    $scope.lists = Lists.all().then(function(res){
                        $scope.lists = res.data;
                    });

    $scope.addTodo = function(list, $event) {
        Todos.addOne($scope.newTodo).then(function($event){

            if ($event.status == 201) {
                console.log($event.data);
                list.todos.push($event.data);
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

    $scope.stopEditTodo = function($index, $event, list, todo) {
        angular.element(event.currentTarget).removeAttr('contenteditable');
        titleBeforeEdit  = todo.title;
        todo.title = event.currentTarget.innerText;
        if (todo.title != titleBeforeEdit) {
            console.log(list);
            Todos.update(list).then(function($event) {
                if ($event.status == 200) {
                    console.log('Saved succesfully');
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

    $scope.deleteTodo = function(list, id){
        Todos.delete(id);

        list.todos = list.todos.filter(function(todo) {
            return todo.id !== id;
        })
    };

    $scope.saveTodo = function($event, todo) {
        angular.element(event.currentTarget).removeAttr('contenteditable');
    };
});

app.controller('cardComposerController', function($scope, $state, $window, Lists, Todos){
    
    $scope.toggleComposer = function(boolean, $event, list) {

        if (boolean) {
            name = "addTodo"+list.id;
            $scope.hide = boolean;
            elementToFocus = document.getElementById(name);
            window.setTimeout(function() {
              elementToFocus[0].focus();
            }, 0);
    
        } else {
            $scope.hide = boolean;
        }
    };
});