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

StorySchema.statics.populateTarget = function(index, stories, res){
    if (stories[index].verb == "post"){
        Post.populate(stories[index], { path: 'target', model: 'Post'}, function (err, story) {
            stories[index] = story;
            if (index + 1 == stories.length)
                return res.status(200).send(stories);
            else
                return StorySchema.statics.populateTarget(index + 1, stories, res);
        });
    }
    if (stories[index].verb == "follow"){
        Follow.populate(stories[index], { path: 'target', model: 'Follow'}, function (err, story) {
            stories[index] = story;
            if (index + 1 == stories.length)
                return res.status(200).send(stories);
            else
                return StorySchema.statics.populateTarget(index + 1, stories, res);
        });
    }
    if (stories[index].verb == "comment"){
        Comment.populate(stories[index], { path: 'target', model: 'Comment'}, function (err, story) {
            stories[index] = story;
            if (index + 1 == stories.length)
                return res.status(200).send(stories);
            else
                return StorySchema.statics.populateTarget(index + 1, stories, res);
        });
    }
}
module.exports = mongoose.model('Story', StorySchema);

