/**
 * Created by gladisk on 12/6/14.
 */
/**
 // ******************************* INFORMATION ***************************/

// ***********************************************************************//
//
// ** LikeController.js - Server-side logic for managing likes..
// ** @return   Like controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var Like = require("../../models/LikeModel");
var _ = require("underscore");

module.exports = {

    // =======================================================================//
    // ! Implements index::action.                                            //
    // =======================================================================//

    index: function(req, res, next){
        Like.find()
            .populate('user')
            .populate('post')
            .exec(function(err, like){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(like);
            });
    },

    // =======================================================================//
    // ! Implements user_likes::action.                                            //
    // =======================================================================//

    user_likes: function(req, res, next){
        var userId = req.param('user_id');

        Like.find({user: userId})
            .populate('post')
            .exec(function(err, like){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(like);
            });
    },

    // =======================================================================//
    // ! Implements create::action.                                           //
    // =======================================================================//

    create: function(req, res, next){
        var like = new Like(req.body);

        //save like
        like.save(function (err){
            if(err)
                return res.json(400, err);
            res.json(like);
        });
    },

    // =======================================================================//
    // ! Implements read::action.                                             //
    // =======================================================================//

    read: function(req, res, next){
        var likeId = req.param('id');

        Like.findById(likeId)
            .populate('user')
            .populate('post')
            .exec(function (err, like){
                if(err)
                    return res.json(500, err);
                if(!like)
                    return res.send(204);
                res.json(like);
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
        Like.findOne(condition, function(err, like){
            if (err)
                return res.status(400).send(err);
            else{
                like = _.extend(like, update);
                like.save(function(err, like){
                    if (err)
                        return res.status(400).send(err);
                    else{
                        return res.status(200).send(like);
                    }
                });
            }
        });
    },

    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroyLike: function(req, res, next){
        var userId = req.param('user_id');
        var postId = req.param('post_id');

        Like.remove({user: userId, post: postId})
            .exec(function(err, like){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(like);
            });
    },
    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroy: function(req, res, next){
        var likeId = req.param('id');

        Like.findByIdAndRemove(likeId, function (err, like){
            if(err)
                return res.json(500, err);
            if(!like)
                return res.send(404);
            res.json(like);
        });
    }
}

