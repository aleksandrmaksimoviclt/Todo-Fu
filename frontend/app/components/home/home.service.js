app.service('Todos', function($http, BASE_URL, LIST_URL){
    var Todos = {};

    Todos.all = function(id){
        console.log('hello, my id is #' + id);
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
