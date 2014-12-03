// ******************************* INFORMATION ***************************//

// ***********************************************************************//
// ** @description :: will handle all request comming from client         //
// ***********************************************************************//

// ********************************** START ******************************//

var express = require('express');
var ApiRouter = express.Router();
var controllers = require('../../api/controllers');
var SECUREROUTE = require("../../api/policies/SecureUrlPolicie");

module.exports = function(passport){

  /* @user login authentification */

  ApiRouter.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/api', failureFlash: true}));

  /* @all user other post methods */

  ApiRouter.post('/user', controllers.api.user.create);
  ApiRouter.post('/user/:id', controllers.api.user.update);

  /* @all user get methods */

  ApiRouter.get('/', SECUREROUTE, controllers.api.welcome.index);
  ApiRouter.get('/users', controllers.api.user.index);
  ApiRouter.get('/user/:user_id', controllers.api.user.read);
  ApiRouter.get('/user/:id/remove', controllers.api.user.destroy);

  return (ApiRouter);
}
