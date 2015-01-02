/**
 ** AuthService.js - client-side logic for authentication ..
 ** @description - set Token before to all request.
*/

ltkApp.factory('authInterceptor', function ($cookies, $rootScope, $q, $window) {
  return {
    // set Baerer Authorization in headers before all request
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        if ($window.sessionStorage.token !== $cookies.ltk_sessionToken)
          $window.sessionStorage.token = $cookies.ltk_sessionToken;
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token
      }
      else if ($cookies.ltk_sessionToken){
        $window.sessionStorage.setItem('token', $cookies.ltk_sessionToken);
        config.headers.Authorization = 'Bearer ' + $cookies.ltk_sessionToken
      }
      return config;
    },
    //Intercept the case before response is throw back to angular api
    response: function (response) {
      if (response.status === 401) {
        window.location.href = "/login";
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

ltkApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
