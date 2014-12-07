/**
 * Created by gladisk on 12/6/14.
 */
/**
 // ******************************* INFORMATION ***************************/

// ***********************************************************************//
//
// ** CommentController.js - Server-side logic for managing comments..
// ** @return   Comment controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var Comment = require("../../models/CommentModel");
var _ = require("underscore");

module.exports = {

    // =======================================================================//
    // ! Implements index::action.                                            //
    // =======================================================================//

    index: function(req, res, next){
        Comment.find()
            .populate('creator')
            .populate('post')
            .exec(function(err, comment){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(comment);
            });
    },

    // =======================================================================//
    // ! Implements create::action.                                           //
    // =======================================================================//

    create: function(req, res, next){
        var comment = new Comment(req.body);

        //save comment
        comment.save(function (err){
            if(err)
                return res.json(400, err);
            res.json(comment);
        });
    },

    // =======================================================================//
    // ! Implements read::action.                                             //
    // =======================================================================//

    read: function(req, res, next){
        var commentId = req.param('id');

        Comment.findById(commentId)
            .populate('creator')
            .populate('post')
            .exec(function (err, comment){
                if(err)
                    return res.json(500, err);
                if(!comment)
                    return res.send(204);
                res.json(comment);
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
        Comment.findOne(condition, function(err, comment){
            if (err)
                return res.status(400).send(err);
            else{
                comment = _.extend(comment, update);
                comment.save(function(err, comment){
                    if (err)
                        return res.status(400).send(err);
                    else{
                        return res.status(200).send(comment);
                    }
                });
            }
        });
    },

    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroy: function(req, res, next){
        var commentId = req.param('id');

        Comment.findByIdAndRemove(commentId, function (err, comment){
            if(err)
                return res.json(500, err);
            if(!comment)
                return res.send(404);
            res.json(comment);
        });
    }
}

