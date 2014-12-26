/**
 * Created by gladisk on 12/26/14.
 */

ltkApp.directive('storypost', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/home/story_post.html"
    }
});
ltkApp.directive('storyfollow', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/home/story_follow.html"
    }
});
ltkApp.directive('storycomment', function(){
    return {
        restrict: 'A',
        templateUrl: "/templates/home/story_comment.html"
    }
});