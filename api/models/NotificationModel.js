/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** NotificationModel.js - Implements Model
// ** @return   Talent model.
//
// ***********************************************************************//

// ********************************** START ******************************//

var mongoose = require('mongoose');
var Story = require("./StoryModel");
var User = require("./UserModel");
var _ = require("underscore");

var NotificationSchema = new mongoose.Schema ({
    from : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    to : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    target : {type : mongoose.Schema.ObjectId, ref: 'Story', required : true},
    read: {type: Boolean, default: false},
    published_date : {type : Date, default : Date.now}
});

//Validate Sender
NotificationSchema.path('from').validate(function(value, respond){
    //find the user
    User.findById(value, function (err, user){
        if(err || !user)
            return respond(false);
        respond(true);
    });
}, "Sender is not found");

//Validate Receiver
NotificationSchema.path('to').validate(function(value, respond){
    //find the user
    User.findById(value, function (err, user){
        if(err || !user)
            return respond(false);
        respond(true);
    });
}, "Receiver is not found");

//Validate Target
NotificationSchema.path('target').validate(function(value, respond){
    //find the post
    Story.findById(value, function (err, story){
        if(err || !story)
            return respond(false);
        respond(true);
    });
}, "Story is not found");

module.exports = mongoose.model('Notification', NotificationSchema);


