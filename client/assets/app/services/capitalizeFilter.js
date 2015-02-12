/**
 * Created by gladisk on 12/26/14.
 */
/**
 ** capitalizeFilter.js - client-side logic for capitalizing string ..
 ** @description - return a capitalized string.
 */
ltkApp.filter('capitalize', function(){
    return function(input){
        if(input){
            return input[0].toUpperCase() + input.slice(1);
        }
    };
});