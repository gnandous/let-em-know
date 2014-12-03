// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** UserController.js - Server-side logic for managing users..
// ** @return   User controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//


var User = require("../../models/UserModel");
var bcrypt = require("bcrypt");
var validator = require("../../helpers/validator");
var _ = require("underscore");

module.exports = {

  // =======================================================================//
  // ! Implements index::action.                                            //
  // =======================================================================//

  index: function(req, res, next){
    User.find(function(err, users){
      if (err){
        return res.status(400).send(err);
      }
      return res.status(200).send(users);
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

    if (!req.body.email) {
      errors.push({
        field: 'email',
        error: 'email must be filled',
        value: req.body.email
      });
    } else if (!validator.isEmail(req.body.email)) {
      errors.push({
        field: 'email',
        error: 'Email must be a valid email',
        value: req.body.email
      });
    }

    if (!req.body.password) {
      errors.push({
        field: 'password',
        error: 'Password must be filled'
      });
    } else if (req.body.password.length < 6) {
      errors.push({
        field: 'password',
        error: "Password must be at least " + 6 + " characters"
      });
    }

    if (req.body.password !== req.body.passwordConfirm) {
      errors.push({
        field: 'passwordConfirm',
        error: 'Passwords are not equal'
      });
    } else if (!req.body.passwordConfirm) {
      errors.push({
        field: 'passwordConfirm',
        error: 'Password confirmation must be filled'
      });
    }

    if (errors.length) {
      return res.status(400).send(errors);
    }

    /**
      * Check if user exists and save in db
      * Or throw err
    */

    User.ifexist({
      email: req.body.email
    }, function(err, user) {
      if (user){
        errors.push({
          field: 'signin',
          error: 'Email already Exists'
        });
        return res.status(400).send(errors);
      }
      else{
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(req.body.password, salt, function(err, hash){
            if(err){
              return res.status(400).send(err);
            }
            var newuser = new User({
              pseudo: req.body.pseudo,
              name: req.body.name,
              email: req.body.email,
              token: User.generateToken(),
              password: hash
            });
            newuser.save(function(err, user){
              if(err){
                return res.status(400).send(err);
              }
               return res.status(200).send("user has been created");
            });
          });
        });
      }
    });
  },

  // =======================================================================//
  // ! Implements destroy::action.                                           //
  // =======================================================================//

  destroy: function(req, res, next){
    var condition = {
      _id: req.params.id
    }
    User.findOne(condition, function(err, user){
      if (user){
        user.remove();
        return res.status(200).send("user removed");
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
    User.findOne(condition,function(err, user){
      if (err){
        return res.status(400).send(err);
      }
      else{
        user = _.extend(user, update);
        user.save(function(err, user){
          if (err){
            return res.status(400).send(err);
          }
          else
            return res.status(200).send(user);
        });
      }
    });
  },

  // =======================================================================//
  // ! Implements read::action.                                             //
  // =======================================================================//

  read: function(req, res, next){
    User.findOne({
      _id: req.params.user_id
    }, function(err, user){
      if(user){
        return res.status(200).send(user);
      }
      else{
        return res.status(400).send(err);
      }
    });
  },

}
