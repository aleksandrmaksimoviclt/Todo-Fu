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