/**
 ** Description :: HomeController /home
 */

ltkApp.controller("HomeController", function($scope, $window, $http, Request, model){

    //======================================================
    //INIT / RETRIEVE DATAS
    //======================================================
    //initializing controller with current_user model.

    $scope.init = (function(){
        $scope.model = model;

        //init story filter
        $scope.story_filter = 'all';

        //getting talents
        Request.url("/api/talents").then(function(value){
            $scope.talents = value;
        });

        //getting Current User posts
        Request.url("/api/user_posts/" + $scope.model._id).then(function(value){
            $scope.user_posts = value;
        });

        //getting Followings
        Request.url("/api/user_followings/" + $scope.model._id)
            .then(function(follows){
                //for each follows
                for (var i = 0; i < follows.length; i++)
                    //Using callBack to save iterator i value
                    (function(i){
                        //get Unread notifications
                        var unreadNotif = Request.url("/api/notifications/unread/" + follows[i].following._id + "/" + model._id)
                            .then(function(notifs){
                                console.log("I="+i);
                                //save count Value
                                follows[i].count_notifications = notifs.length;
                                //update scope
                                $scope.follows = follows;
                            }
                        );
                    })(i);

            });

        //getting Followers
        Request.url("/api/user_followers/" + $scope.model._id)
            .then(function(follows){
                $scope.followers = follows;
            });

        //getting Stories
        Request.url("/api/stories/").then(function(stories){
            $scope.stories = stories;

        });
    })();

    //======================================================
    //FUNCTIONS
    //======================================================

    //===================
    //Story filter
    //===================
    $scope.setStoryFilter =  function(filter){
        $scope.story_filter = filter;
    }
    $scope.filter_allows = function(story){
        //Allows every type
        if ($scope.story_filter == "all")
            return true;

        //Allows comments, follows and likes only
        if ($scope.story_filter == story.verb)
            return true;

        //Allows post only
        if (story.verb == 'post'){
            if ($scope.story_filter == story.target.object.post_type)
                return true;
        }

        return false;
    }
    //===================
    //Send Comment
    //===================
    $scope.sendComment = function(post){
            var data = {
                message : post.new_comment,
                creator: model._id,
                post: post._id
            }
            //Request to add comment
            Request.post("/api/comment/", data).then(function(comment){
                comment.creator = model;
                post.comments.push(comment);

                //empty input and var
                post.new_comment = '';

                //add new story to scope
                var comment_story = {
                    verb : "comment",
                    creator: model,
                    target: {
                        object: comment,
                        type: "COMMENT"
                    }
                };
                $scope.stories.unshift(comment_story); //add as first elem of array
            });
    }


});
