app.service('Todos', function($http, TODOS_URL, LIST_URL){
    var Todos = {};

    Todos.all = function(id){
        return $http.get(LIST_URL + id + '/todos/');
    };

    Todos.update = function(updatedTodo){
        return $http.put(TODOS_URL + updatedTodo.id + '/', updatedTodo);
    };

    Todos.delete = function(id){
        return $http.delete(TODOS_URL + id + '/');
    };

    Todos.addOne = function(newTodo){
        return $http.post(TODOS_URL, newTodo)
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
