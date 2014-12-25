/**
 * Created by gladisk on 12/25/14.
 */
/**
 ** Description :: followingListController /home
 */

ltkApp.controller('FollowingController', ['$scope', '$http', function($scope, $http) {
    $scope.followings = null;
    $http.get('api/followings/').
        success(function(data) {
            $scope.followings = data;
        }).
        error(function(data){
            //handle error
            $scope.errorStatus = JSON.parse(JSON.stringify(response.data));
        });
}]);