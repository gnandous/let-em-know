/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** StoryModel.js - Implements Model
// ** @return   Talent model.
//
// ***********************************************************************//

// ********************************** START ******************************//

var mongoose = require('mongoose');
var Follow = require("./FollowModel");
var Comment = require("./CommentModel");
var Post = require("./PostModel");
var User = require("./UserModel");
var _ = require("underscore");

var StorySchema = new mongoose.Schema ({
    verb : {type : String, required : true, enum: ["post", "follow","comment"]},
    creator : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    target : {
      object: {
        type :  mongoose.Schema.ObjectId,
        required: true
      },
      type : {
        type : String,
        required : true
      }
    },
    published_date : {type : Date, default : Date.now}

});

//Validate User
StorySchema.path('creator').validate(function(value, respond){
    //find the user
    User.findById(value, function (err, user){
        if(err || !user)
            return respond(false);
        respond(true);
    });
}, "User is not found");


module.exports = mongoose.model('Story', StorySchema);

