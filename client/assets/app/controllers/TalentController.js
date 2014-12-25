/**
 * Created by gladisk on 12/25/14.
 */
/**
 ** Description :: TalentListController /home
 */

ltkApp.controller('TalentController', ['$scope', '$http', function($scope, $http) {
    $scope.talents = null;
    $http.get('api/talents/').
        success(function(data) {
            $scope.talents = data;
        }).
        error(function(data){
            //handle error
            $scope.errorStatus = JSON.parse(JSON.stringify(response.data));
        });
}]);