/**
 * Created by gladisk on 12/6/14.
 */
// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** TalentController.js - Server-side logic for managing talents..
// ** @return   Talent controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//


var Talent = require("../../models/TalentModel");
var _ = require("underscore");

module.exports = {

    // =======================================================================//
    // ! Implements index::action.                                            //
    // =======================================================================//

    index: function(req, res, next){
        Talent.find(function(err, talents){
            if (err){
                return res.status(400).send(err);
            }
            return res.status(200).send(talents);
        });
    },

    // =======================================================================//
    // ! Implements create::action.                                           //
    // =======================================================================//

    create: function(req, res, next){
        var errors = [];

        /**
         * Check if all inputs have been filled correctly
         * before saving them
         */

        if (!req.body.name) {
            errors.push({
                field: 'name',
                error: 'name must be filled',
                value: req.body.name
            });
        }

        if (!req.body.description) {
            errors.push({
                field: 'description',
                error: 'Description must be filled'
            });
        }

        //Return if error found
        if (errors.length) {
            return res.status(400).send(errors);
        }

        if (Talent.exist(req.body.name)){
            //throw error if talent exist already
            errors.push({
                field: 'signin',
                error: 'Talent already Exists'
            });
            return res.status(400).send(errors);
        }
        else {
            //Create a new Talent
            var newTalent = new Talent({
                name: req.body.name,
                description: req.body.description
            });

            //Save the new Talent
            newTalent.save(function(err, talent){
                if(err){
                    return res.status(400).send(err);
                }
                return res.status(200).send("Talent has been created");
            });
        }
    },

    // =======================================================================//
    // ! Implements destroy::action.                                           //
    // =======================================================================//

    destroy: function(req, res, next){
        var condition = {
            _id: req.params.id
        }
        Talent.findOne(condition, function(err, talent){

            var name = talent.name;
            if (talent){
                talent.remove();
                return res.status(200).send("talent "+ name + " removed");
            }
            else
                return res.status(400).send(err);
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
        Talent.findOne(condition,function(err, talent){
            if (err){
                return res.status(400).send(err);
            }
            else{
                talent = _.extend(talent, update);
                talent.save(function(err, talent){
                    if (err){
                        return res.status(400).send(err);
                    }
                    else
                        return res.status(200).send(talent);
                });
            }
        });
    },

    // =======================================================================//
    // ! Implements read::action.                                             //
    // =======================================================================//

    read: function(req, res, next){
        Talent.findOne({
            _id: req.params.talent_id
        }, function(err, talent){
            if(talent){
                return res.status(200).send(talent);
            }
            else{
                return res.status(400).send(err);
            }
        });
    }

}
