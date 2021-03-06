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
var User = require("./UserModel");
var _ = require("underscore");

var StorySchema = new mongoose.Schema ({
    verb : {type : String, required : true, enum: ["post","follow","comment", "like"]},
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

// Mongoose statics

StorySchema.statics.populateStoriesTarget = function(stories, callback){
    var acc = [];
    var uids = stories.slice();
    (function next(){
        if (!uids.length) return callback(null, acc);
        var uid = uids.pop();

        // handle post type

        if (uid.target.type === "POST"){
            uid.populate({path : 'target.object', model : 'Post'}, function(err, story){
                if (err) return callback(err);

                story.populate({path : 'target.object.comments', model : 'Comment'}, function(err, story){
                    if (err) return callback(err);

                    story.populate({path : 'target.object.comments.creator', model : 'User'}, function(err, story){
                        if (err) return callback(err);

                        acc.push(story);
                        next();
                    });
                });
            });
        }

        // handle like type

        else if (uid.target.type === "LIKE"){
            uid.populate({path : 'target.object', model : 'Like'}, function(err, story){
                if (err) return callback(err);

                story.populate({path : 'target.object.post', model : 'Post'}, function(err, story){
                    if (err) return callback(err);

                    acc.push(story);
                    next();
                });
            });
        }

        // handle Comment type

        else if (uid.target.type === "COMMENT"){
            uid.populate({path : 'target.object', model : 'Comment'}, function(err, story){
                if (err) return callback(err);

                story.populate({path : 'target.object.post', model : 'Post'}, function(err, story){
                    if (err) return callback(err);

                    acc.push(story);
                    next();
                });
            })
        }

        // handle follow type

        else if (uid.target.type === "FOLLOW"){
            uid.populate({path : 'target.object', model : 'Follow'}, function(err, story){
                if (err) return callback(err);

                story.populate({path : 'target.object.follower', model : 'User'}, function(err, story){
                    if (err) return callback(err);

                    story.populate({path : 'target.object.following', model : 'User'}, function(err, story){
                        if (err) return callback(err);

                        acc.push(story);
                        next();
                    });
                });
            })
        }
    })();
}
module.exports = mongoose.model('Story', StorySchema);

