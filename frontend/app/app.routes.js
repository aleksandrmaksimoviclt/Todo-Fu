app.constant('LIST_URL', 'http://localhost:8000/api/lists/');
app.constant('TODOS_URL', 'http://localhost:8000/api/todos/');


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