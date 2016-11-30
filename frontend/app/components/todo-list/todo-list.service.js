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