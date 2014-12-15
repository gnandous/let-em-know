/**
 ** Description :: NewPostController /home
*/

ltkApp.controller("NewPostController", function($scope, $window, $http, model, talents){

  //initializing controller with current_user model.
  $scope.init = (function(){
    // drop zone options config
    $(".dropzone").dropzone({
      url: "/api/post/media/upload",
      headers: {
        "Authorization": "Bearer " + model.token
      }
    });
    $scope.talents = talents;
    $scope.model = model;
  })();

  $scope.post = {};

});
