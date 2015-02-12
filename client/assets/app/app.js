// declaration off module and its dependencies

var ltkApp = angular.module('ltkApp', ['ngRoute', 'ngCookies']);

// config angular app

ltkApp.config(function($routeProvider, $locationProvider){

  // Routing definition

  $routeProvider.
    when("/home", {
      templateUrl: '/templates/home.html',
      controller: 'HomeController',
      resolve: { model: function(Request){ return Request.url("/api/current_user");}}
    }).
    when("/post/new", {
      templateUrl: '/templates/newpost.html',
      controller: 'NewPostController',
      resolve: {
        model: function(Request){ return Request.url("/api/current_user");},
        talents: function(Request){ return Request.url("/api/talents");}
      }
    }).
    when("/profile/edit", {
      templateUrl: '/templates/editprofile.html',
      controller: 'EditProfileController',
      resolve: {
        current_user: function(Request){ return Request.url("/api/current_user");}
      }
    }).
    otherwise({ redirectTo: '/login' });
    $locationProvider.html5Mode(true);

});
