/**
 ** Description :: NewPostController /home
*/

ltkApp.controller("NewPostController", function($scope, $window, $http, model){

  //initializing controller with current_user model.
  $scope.init = (function(){
    $scope.model = model;
  })();

});
