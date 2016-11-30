app.constant('BASE_URL', 'http://localhost:8000/api/todos/');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'assets/home/home.template.html',
            controller: 'homeController'
        });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});