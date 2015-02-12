/**
 * Created by gladisk on 12/6/14.
 */
/**
 // ******************************* INFORMATION ***************************/

// ***********************************************************************//
//
// ** PostController.js - Server-side logic for managing posts..
// ** @return   Post controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var Post = require("../../models/PostModel");
var _ = require("underscore");

module.exports = {

    // =======================================================================//
    // ! Implements index::action.                                            //
    // =======================================================================//

    index: function(req, res, next){
        Post.find()
            .populate('creator')
            .populate('tags')
            .exec(function(err, post){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(post);
            });
    },

    // =======================================================================//
    // ! Implements User_post::action.                                            //
    // =======================================================================//

    user_posts: function(req, res, next){
        var userId = req.param('user_id');

        Post.find({creator: userId})
            .populate('creator')
            .populate('tags')
            .exec(function(err, post){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(post);
            });
    },

    // =======================================================================//
    // ! Implements create::action.                                           //
    // =======================================================================//

    create: function(req, res, next){
        var post = new Post(req.body);
        post.save(function (err){
            if(err){
              next (err);
            }
            else
              res.send(post);
        });
    },

    // =======================================================================//
    // ! Implements read::action.                                             //
    // =======================================================================//

    read: function(req, res, next){
        var postId = req.param('id');

        Post.findById(postId)
            .populate('creator')
            .populate('tags')
            .exec(function (err, post){
                if(err)
                    return res.json(500, err);
                if(!post)
                    return res.send(204);
                res.send(post);
            });
    },
    // =======================================================================//
    // ! Implements uploads::action.                                          //
    // =======================================================================//

    upload: function(req, res, next){
      // TODO Check if its video, audio or image for files partitions
      res.json(req.files.file.name);
    },

    // =======================================================================//
    // ! Implements update::action.                                           //
    // =======================================================================//

    update: function(req, res, next){
        var condition = {
            _id: req.params.id
        }
        var update = req.body;
        Post.findOne(condition, function(err, post){
            if (err)
                return res.status(400).send(err);
            else{
                post = _.extend(post, update);
                post.save(function(err, post){
                    if (err)
                        return res.status(400).send(err);
                    else{
                        return res.status(200).send(post);
                    }
                });
            }
        });
    },

    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroy: function(req, res, next){
        var postId = req.param('id');

        Post.findByIdAndRemove(postId, function (err, post){
            if(err)
                return res.json(500, err);
            if(!post)
                return res.send(404);
            res.json(post);
        });
    }
}
