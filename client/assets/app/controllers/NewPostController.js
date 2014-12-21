/**
 ** Description :: NewPostController /home
*/

ltkApp.controller("NewPostController", function($scope, $window, $http, model, talents){

  //initializing controller with current_user model.
  $scope.init = (function(){
    // $scope variable initialization

    $scope.talents = talents;
    $scope.model = model;

    $scope.post = {
      tags: [],
      title : "",
      post_type: "image",
      creator: $scope.model._id,
      content: ""
    };
    $scope.resErr = false;
    $scope.resmessages = [];

    // dropzone options config

    var OPTIONS = {
      init: function(){
        this.on("addedfile", function(file) {
          if (file.type === "image/png" || file.type === "image/JPEG"){
            $scope.post.post_type = "image"
          }
          else if (file.type === "video/mp4"){
            $scope.post.post_type = "audio"
          }
          else
            $scope.post.post_type = "video"
        });
      },
      url: "/api/post/media/upload",
      headers: {
        "Authorization": "Bearer " + model.token
      },
      previewsContainer: "#dropzonecontainer",
      thumbnailWidth: 250,
      thumbnailHeight: 250,
      /*
      addRemoveLinks : false,
      thumbnailWidth: 250,
      thumbnailHeight: 250,
      */
      uploadprogress: function(file, data){
        var progress = data + "%";
        $('.progress-bar').css('width', progress);
        //console.log(data);
      },

      processing: function(file){
        $(".infos").css('display', 'none');
      },
      success: function(response, data){
        $scope.post.content = "/uploads/" + data;
        //$("#dropFile").append("<img width='100%' height='400px' src='/uploads/" + data + "'/>");
      }
    };

    // Dropzone init with config
    $(".dropzone").dropzone(OPTIONS);

  })();

  // Scope methods

  $scope.setTalents = function(index){
    if ($scope.post.tags.indexOf($scope.talents[index]._id) === -1){
      $scope.post.tags.push($scope.talents[index]._id);
    }
    else
      this.removeTalents(index);
  }

  $scope.removeTalents = function(index){
    this.post.tags.splice(this.post.tags.indexOf($scope.talents[index]._id), 1);
  }
  $scope.send = function(){
    $scope.resmessages = [];
    $http.post('/api/post/', $scope.post).
      success(function(data, status, headers, config) {
        $scope.resErr = false;
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        if (data){
          _.each(data.errors, function(val, key){
            $scope.resmessages.push(val.message);
          });
          $scope.resErr = true;
        }
    });
  }


});
