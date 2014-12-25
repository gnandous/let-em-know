/*Directive Post and Post_filter*/
ltkApp.directive('post', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/main_content/post.html"
    }
});
ltkApp.directive('post_filter', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/main_content/post_filter.html"
    }
});