/**
 ** AuthService.js - client-side logic for authentication ..
 ** @description - set Token before to all request.
*/

ltkApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

ltkApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
