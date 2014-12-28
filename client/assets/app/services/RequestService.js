/**
 ** @description :: This service is such a helper for communcicating with the API
 ** to run the function async just call the service like so
 ** Request.url("someurl").then(function(value){});
*/

ltkApp.factory('Request', function ($cookies, $rootScope, $q, $window, $http) {
  return {
      url : function(url){
        var deferred = $q.defer(); // using promise in case the function had to be called asynchronously
        $http.get(url).
          success(function(data, status, headers, config) {
            deferred.resolve(data); // resolving the promise in success case
          }).
          error(function(data, status, headers, config) {
            deferred.reject(status); // rejecting the promise in error case
          });
        return deferred.promise; // returning the promise
      },
      post : function(url, post_data){
          var deferred = $q.defer(); // using promise in case the function had to be called asynchronously
          $http.post(url, post_data).
              success(function(data, status, headers, config) {
                  deferred.resolve(data); // resolving the promise in success case
              }).
              error(function(data, status, headers, config) {
                  deferred.reject(status); // rejecting the promise in error case
              });
          return deferred.promise; // returning the promise
      }
  }

});
