/**
 ** Description :: EditProfileController /profile/edit
*/
ltkApp.controller("EditProfileController", function($scope, $window, $http, Request, current_user){

  // init controller
  $scope.init = (function(){
    $scope.user = current_user;
  })();

  //methods

  $scope.uploadImage = function(){
    var selectedfile = document.getElementById("attached_file");
    selectedfile.click();
  }

  $scope.loadFileFromDesktop = function(elem){
    var form = new FormData();
    var xhr = new XMLHttpRequest();

    form.append('file', elem.files[0]);
    form.append('me', 'souleymane');

    xhr.upload.addEventListener('progress', function(e){
      if (e.lengthComputable){
        var perc = Math.round(e.loaded / e.total)  * 100;
        var pourcentage = perc + "%";
        $(".uploadbar").css('width', pourcentage);
      }
    }, false);

    xhr.onreadystatechange=function(){
      if (xhr.readyState==4 && xhr.status==200){
        $(".user_avatar").attr("src", xhr.responseText);
        $scope.user.avatar = xhr.responseText;
      }
    }

    xhr.open("POST", "/api/medias?access_token=" + $scope.user.token);
    xhr.send(form);
  }

  // send change to server

  $scope.save = function(){
    $(".edit_profile_message").css("display", "block");
    $(".edit_profile_message").removeClass("animated flipInX");
    $http.post('/api/user/' + $scope.user._id, $scope.user).
      success(function(data, status, headers, config) {
        $(".edit_profile_message").css("display", "block");
        $(".edit_profile_message").addClass("animated flipInX");
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        console.log(status);
    });

  }

});
