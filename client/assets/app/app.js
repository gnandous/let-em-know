// declaration off module and its dependencies

var ltkApp = angular.module('ltkApp', ['ngRoute']);

// config angular app

ltkApp.config(function($routeProvider, $locationProvider){

  // Routing definition
  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  }).
  otherwise({ redirectTo: '/login' });
  $locationProvider.html5Mode(true);

});
