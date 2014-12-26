/**
 ** Description :: HomeController /home
 */

ltkApp.controller("HomeController", function($scope, $window, $http, Request, model){

    //initializing controller with current_user model.

    $scope.init = (function(){
        $scope.model = model;

        //getting talents
        Request.url("/api/talents").then(function(value){
            $scope.talents = value;
        });

        //getting Follows
        Request.url("/api/user_follows/" + $scope.model._id)
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
                console.log(JSON.parse(JSON.stringify(follows)));
            });
    })();
});
