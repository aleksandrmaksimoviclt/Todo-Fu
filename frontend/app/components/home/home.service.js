app.service('Todos', function($http, TODOS_URL, LIST_URL){
    var Todos = {};

    Todos.all = function(id){
        return $http.get(LIST_URL + id + '/todos/');
    };
    
    Todos.update = function(list){
        return $http.patch(LIST_URL + list.id + '/', list);
    };

    Todos.delete = function(id){
        return $http.delete(TODOS_URL + id + '/');
    };

    Todos.addOne = function(list){
        return $http.post(LIST_URL + list.id + '/', list);
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
