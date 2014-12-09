/**
 ** Description :: HomeController /home
*/

ltkApp.controller("HomeController", function($scope, $window, $http, Request, model){

  //initializing controller with current_user model.

  $scope.init = (function(){
    $scope.model = model;
  })();
});
