/**
 * Created by gladisk on 12/6/14.
 */
/**
 // ******************************* INFORMATION ***************************/

// ***********************************************************************//
//
// ** NotificationController.js - Server-side logic for managing notifications..
// ** @return   Notification controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var Notification = require("../../models/NotificationModel");
var _ = require("underscore");

module.exports = {

    // =======================================================================//
    // ! Implements index::action.                                            //
    // =======================================================================//

    index: function(req, res, next){
        Notification.find()
            .populate('from')
            .populate('to')
            .populate('target')
            .exec(function(err, notification){
                if (err){
                    return res.status(400).send(err);
                }
                return res.status(200).send(notification);
            });
    },

    // =======================================================================//
    // ! Implements create::action.                                           //
    // =======================================================================//

    create: function(req, res, next){
        var notification = new Notification(req.body);

        //save notification
        notification.save(function (err){
            if(err)
                return res.json(400, err);
            res.json(notification);
        });
    },

    // =======================================================================//
    // ! Implements read::action.                                             //
    // =======================================================================//

    read: function(req, res, next){
        var notificationId = req.param('id');

        Notification.findById(notificationId)
            .populate('from')
            .populate('to')
            .populate('target')
            .exec(function (err, notification){
                if(err)
                    return res.json(500, err);
                if(!notification)
                    return res.send(204);
                res.json(notification);
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
        Notification.findOne(condition, function(err, notification){
            if (err)
                return res.status(400).send(err);
            else{
                notification = _.extend(notification, update);
                notification.save(function(err, notification){
                    if (err)
                        return res.status(400).send(err);
                    else{
                        return res.status(200).send(notification);
                    }
                });
            }
        });
    },

    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroy: function(req, res, next){
        var notificationId = req.param('id');

        Notification.findByIdAndRemove(notificationId, function (err, notification){
            if(err)
                return res.json(500, err);
            if(!notification)
                return res.send(404);
            res.json(notification);
        });
    }
}

