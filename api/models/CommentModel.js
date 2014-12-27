/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** CommentModel.js - Implements Model
// ** @return   Talent model.
//
// ***********************************************************************//

// ********************************** START ******************************//

var mongoose = require('mongoose');
var Story = require("./StoryModel");
var User = require("./UserModel");
var _ = require("underscore");

var CommentSchema = new mongoose.Schema ({
    creator : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    post : {type : mongoose.Schema.ObjectId, ref: 'Post', required : true},
    message : {type : String, required : true},
    published_date : {type : Date, default : Date.now}
});

//Validate User
CommentSchema.path('creator').validate(function(value, respond){
    //find the user
    User.findById(value, function (err, user){
        if(err || !user)
            return respond(false);
        respond(true);
    });
}, "User is not found");

//Validate User
CommentSchema.path('post').validate(function(value, respond){
    //find the post
    Post.findById(value, function (err, post){
        if(err || !post)
            return respond(false);
        respond(true);
    });
}, "Post is not found");

// After saving comment We must create a Storie

CommentSchema.post('save', function (doc) {
  // create the associate story
  story = new Story({
    verb : "comment",
    creator : doc.creator,
    target : {
      object : doc._id,
      type : "COMMENT"
    }
  });
  story.save();
})

module.exports = mongoose.model('Comment', CommentSchema);


