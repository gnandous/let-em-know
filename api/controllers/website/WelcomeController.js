/**
 * WelcomeController.js
 *
 * @description :: Server-side logic for managing anonyme users.
 */

var User = require('../../models/UserModel');
var config = require('../../../config/environnement');
var validator = require('../../helpers/validator');
var bcrypt = require("bcrypt");

module.exports = {

  // implements index method

  index: function(req, res, next){
    res.render('index', { title: 'Hello world', description: '<< this page is generated by WelcomeController >>' });
  },

  // @description :: render signup page

  signup: function(req, res, next){
    res.render('signup', {title : "signup"});
  },

  // @description :: render login page

  login: function(req, res, next){
    res.render('login', {title: "login"});
  },

  // =======================================================================//
  // @description :: Implements login logic from website                    //
  // @return ::  User data through json format                              //
  // =======================================================================//

  loginFromWebsite: function(req, res, next){
    var errors = [];
    if (!req.body.pseudo) {
      errors.push({
        field: 'pseudo',
        error: 'pseudo must be filled',
        value: req.body.pseudo
      });
    }
    if (!req.body.password) {
      errors.push({
        field: 'password',
        error: 'password must be filled',
        value: req.body.password
      });
    }
    if (errors.length) {
      return(res.render('login', {messages: errors, fields: req.body}));
    }
    var condition = {
      pseudo: req.body.pseudo
    }

    User.findOne(condition, function(err, user){
      if (!user){
        errors.push({
          field: 'message',
          error: 'user doesnt exist',
          value: 'user doesnt exist'
        });
        res.render('login', {messages: errors, fields: req.body});
      }
      else{
        user.comparePassword(req.body.password, function(err, isMatch){
          if (!isMatch){res.render('login', {messages: [{error: 'password is not valid'}], fields: req.body});}
          else{
            var cookieValue = user.token
            res.cookie(config.session.cookie.name + "Token", cookieValue, {httpOnly: false });
            res.redirect('/home');
          }
        });
      }
    });
  },


  // =======================================================================//
  // @description :: Implements signup logic from website                    //
  // @return ::  User data through json format                              //
  // =======================================================================//

  signupFromWebsite: function(req, res, next){

    var errors = [];

    if (!req.body.email){
      errors.push({
        field: 'email',
        error: 'Email must be filled',
        value: req.body.email
      })
    }
    else if (!validator.isEmail(req.body.email)){
       errors.push({
        field: 'email',
        error: 'Email must be a valid email',
        value: req.body.email
      })
    }
    if (!req.body.password){
      errors.push({
        field: 'password',
        error: 'Password must be filled',
        value: req.body.password
      })
    }
    if (req.body.password !== req.body.passwordConfirm){
      errors.push({
        field: 'passwordConfirm',
        error: 'Passwords are not equal',
        value: req.body.passwordConfirm
      })
    }
    else if (!req.body.passwordConfirm){
      errors.push({
        field: 'passwordConfirm',
        error: 'PasswordConfirm must be filled',
        value: req.body.password
      })
    }

    if (!req.body.firstname){
      errors.push({
        field: 'firstname',
        error: 'Firstname must be filled',
        value: req.body.firstname
      })
    }
    if (!req.body.lastname){
      errors.push({
        field: 'lastname',
        error: 'Lastname must be filled',
        value: req.body.lastname
      })
    }
    if (errors.length){res.render('signup', {errors: errors, fields: req.body});}
    else{
      data = {email: req.body.email}

      User.ifexist(data, function(err, user){
        if(user){
          errors.push({
            field: 'email',
            error: 'User already exists',
            value: req.body.email
          });
          res.render('signup', {errors: errors, fields: req.body});
        }
        else
          bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, function(err, hash){
              if(err){
                return next(err);
              }
              var newuser = new User({
                name: req.body.name,
                email: req.body.email,
                token: User.generateToken(),
                password: hash,
                pseudo: req.body.lastname,
                firstname: req.body.firstname,
                lastname: req.body.lastname
              });
              newuser.save(function(err, user){
                if (err)
                  return next(err);
                else
                  res.render('signup', {message : {value: "User had been created successfully"}, fields: req.body});
              });
            });
          });
       });
    }
  }


}
