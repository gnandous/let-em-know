/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** PostModel.js - Implements Model
// ** @return   Talent model.
//
// ***********************************************************************//

// ********************************** START ******************************//

var mongoose = require('mongoose');
var Talent = require("./TalentModel");
var User = require("./UserModel");
var _ = require("underscore");

var PostSchema = new mongoose.Schema ({
    creator : {type : mongoose.Schema.ObjectId, ref: 'User', required : true},
    tags : [{type : mongoose.Schema.ObjectId, ref: 'Talent'}],
    content : {type : String, required : true},
    published_date : {type : Date, default : Date.now},
    post_type : {type : String, required : true, enum: ["video", "image","audio"]}
});

//validate Tags
PostSchema.path('tags').validate(function(list, respond){
    //Error array empty
    if (list.length < 1)
        return respond(false);

    //check all listed talents exist
    for (var i = 0; i < list.length; i++) {
        Talent.findById(list[i], function (err, talent){
            //Error: talent not found
            if(err || !talent)
                return respond(false);
        });
    }
    //Success: all talents found
    respond(true);
}, "A Talent is not found or no talent set");

//Validate User
PostSchema.path('creator').validate(function(value, respond){
    //find the user
    User.findById(value, function (err, user){
        if(err || !user)
            return respond(false);
        respond(true);
    });
}, "User is not found");


module.exports = mongoose.model('Post', PostSchema);

