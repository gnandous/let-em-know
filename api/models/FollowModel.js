/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** FollowModel.js - Implements Model
// ** @return   Talent model.
//
// ***********************************************************************//

// ********************************** START ******************************//

var mongoose = require('mongoose');
var User = require("./UserModel");
var _ = require("underscore");

var FollowSchema = new mongoose.Schema ({
    follower : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    following : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    date : {type : Date, default : Date.now}
});

//Validate follower
FollowSchema.path('follower').validate(function(value, respond){
    //find the follower
    User.findById(value, function (err, follower){
        if(err || !follower)
            return respond(false);
        respond(true);
    });
}, "Follower is not found");

//Validate following
FollowSchema.path('following').validate(function(value, respond){
    //find the following
    User.findById(value, function (err, following){
        if(err || !following)
            return respond(false);
        respond(true);
    });
}, "Following is not found");

module.exports = mongoose.model('Follow', FollowSchema);


