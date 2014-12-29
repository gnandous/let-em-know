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
                                //save count Value
                                follows[i].count_notifications = notifs.length;
                                //update scope
                                $scope.follows = follows;
                            }
                        );
                    })(i);

            });

        //getting Followers (used for count followers in profil tab)
        Request.url("/api/user_followers/" + $scope.model._id)
            .then(function(follows){
                $scope.followers = follows;
            });

        //getting talents
        Request.url("/api/talents").then(function(value){
            $scope.talents = value;
        });

        //getting Current User posts
        Request.url("/api/user_posts/" + $scope.model._id).then(function(value){
            $scope.user_posts = value;
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
    //Follows
    //===================

    //-------Follow action-------

    $scope.follow = function(following){
        var data = {
            follower: model._id,
            following: following._id
        }
        //Request to add follow to DB
        Request.post("/api/follow/", data).then(function(new_follow){
            //return if already in list
            var index = $scope.getFollowIndex(new_follow.following);
            if (index > 0)
                return;

            //add new follow to list
            data.follower = model;
            data.following = following;
            $scope.follows.push(data);

            //add new story to scope
            new_follow.follower = model;
            new_follow.following = following;
            var follow_story = {
                verb : "follow",
                creator: model,
                target: {
                    object: new_follow,
                    type: "FOLLOW"
                }
            };
            $scope.stories.unshift(follow_story); //add as first elem of array
        });
    }

    //-------Unfollow action------------

    $scope.unfollow = function(following){
        //return if the follows is not list
        var index = $scope.getFollowIndex(following);
        if (index == -1)
            return;

        //remove follows from list
        $scope.follows.splice(index, 1);

        //Request to remove follow to DB
        Request.url("/api/unfollow/" + model._id + "/" + following._id).then(function(follow){
            //nothing special to do
            console.log("removed");
        });
    }


    //-----get follow index----------

    $scope.getFollowIndex = function(following){
        for (var i = 0; i < $scope.follows.length; i++){
            if ($scope.follows[i].following._id == following._id)
                return i;
        }
        return -1;
    }

    //===================
    //Comment
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
