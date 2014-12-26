/**
 * Created by gladisk on 12/6/14.
 */
/**
 // ******************************* INFORMATION ***************************/

// ***********************************************************************//
//
// ** FollowController.js - Server-side logic for managing follows..
// ** @return   Follow controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var Follow = require("../../models/FollowModel");
var _ = require("underscore");

module.exports = {

    // =======================================================================//
    // ! Implements index::action.                                            //
    // =======================================================================//

    index: function(req, res, next){
        Follow.find()
            .populate('follower')
            .populate('following')
            .exec(function(err, follow){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(follow);
            });
    },

    // =======================================================================//
    // ! Implements create::action.                                           //
    // =======================================================================//

    create: function(req, res, next){
        var follow = new Follow(req.body);

        //save follow
        follow.save(function (err){
            if(err)
                return res.json(400, err);
            res.json(follow);
        });
    },

    // =======================================================================//
    // ! Implements read::action.                                             //
    // =======================================================================//

    read: function(req, res, next){
        var followId = req.param('id');

        Follow.findById(followId)
            .populate('follower')
            .populate('following')
            .exec(function (err, follow){
                if(err)
                    return res.json(500, err);
                if(!follow)
                    return res.send(204);
                res.json(follow);
            });
    },

    // =======================================================================//
    // ! Implements update::action.                                           //
    // =======================================================================//

    update: function(req, res, next){
        var condition = {
            _id: req.params.id
        }
        var update = req.body;
        Follow.findOne(condition, function(err, follow){
            if (err)
                return res.status(400).send(err);
            else{
                follow = _.extend(follow, update);
                follow.save(function(err, follow){
                    if (err)
                        return res.status(400).send(err);
                    else{
                        return res.status(200).send(follow);
                    }
                });
            }
        });
    },

    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroy: function(req, res, next){
        var followId = req.param('id');

        Follow.findByIdAndRemove(followId, function (err, follow){
            if(err)
                return res.json(500, err);
            if(!follow)
                return res.send(404);
            res.json(follow);
        });
    },
    // =======================================================================//
    // ! Implements User followings::action.                                  //
    // =======================================================================//

    userFollows: function(req, res, next){
        var followerId = req.param('id');

        Follow.find({'follower': followerId})
            .populate('following')
            .exec(function(err, follows){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(follows);
            });
    }
}

