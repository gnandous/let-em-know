/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** LikeModel.js - Implements Model
// ** @return   Talent model.
//
// ***********************************************************************//

// ********************************** START ******************************//

var mongoose = require('mongoose');
var Post = require("./PostModel");
var User = require("./UserModel");
var _ = require("underscore");

var LikeSchema = new mongoose.Schema ({
    user : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    post : {type : mongoose.Schema.ObjectId, ref: 'Post', required : true},
    value : {type : Number, required : true, min: -1, max: 1}
});

//Validate User
LikeSchema.path('user').validate(function(value, respond){
    //find the user
    User.findById(value, function (err, user){
        if(err || !user)
            return respond(false);
        respond(true);
    });
}, "User is not found");

//Validate User
LikeSchema.path('post').validate(function(value, respond){
    //find the post
    Post.findById(value, function (err, post){
        if(err || !post)
            return respond(false);
        respond(true);
    });
}, "Post is not found");

// After saving We must create a Storie

LikeSchema.post('save', function (doc) {
  // create the associate story
  story = new Story({
    verb : "like",
    creator : doc.user,
    target : {
      object : doc._id,
      type : "LIKE"
    }
  });
  story.save();
})

module.exports = mongoose.model('Like', LikeSchema);


