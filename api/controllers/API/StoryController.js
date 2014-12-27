/**
 * Created by gladisk on 12/6/14.
 */
/**
 // ******************************* INFORMATION ***************************/

// ***********************************************************************//
//
// ** StoryController.js - Server-side logic for managing storys..
// ** @return   Story controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var Story = require("../../models/StoryModel");
var _ = require("underscore");

module.exports = {

    // =======================================================================//
    // ! Implements index::action.                                            //
    // =======================================================================//

    index: function(req, res, next){

        Story.find()
            .populate('creator')
            .exec(function(err, story){
                if (err){
                    return res.status(400).send(err);
                }

                Story.populateStories(story, function(err, stories){
                  if (err)
                    return next(err);
                  return res.status(200).send(stories);
                });
            });
    },

    // =======================================================================//
    // ! Implements create::action.                                           //
    // =======================================================================//

    create: function(req, res, next){
        var story = new Story(req.body);

        //save story
        story.save(function (err){
            if(err)
                return res.json(400, err);
            res.json(story);
        });
    },

    // =======================================================================//
    // ! Implements read::action.                                             //
    // =======================================================================//

    read: function(req, res, next){
        var storyId = req.param('id');

        Story.findById(storyId)
            .populate('creator')
            .exec(function (err, story){
                if(err)
                    return res.json(500, err);
                if(!story)
                    return res.send(204);
                res.json(story);
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
        Story.findOne(condition, function(err, story){
            if (err)
                return res.status(400).send(err);
            else{
                story = _.extend(story, update);
                story.save(function(err, story){
                    if (err)
                        return res.status(400).send(err);
                    else{
                        return res.status(200).send(story);
                    }
                });
            }
        });
    },

    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroy: function(req, res, next){
        var storyId = req.param('id');

        Story.findByIdAndRemove(storyId, function (err, story){
            if(err)
                return res.json(500, err);
            if(!story)
                return res.send(404);
            res.json(story);
        });
    }
}
