/**
  @description :: will handle all anonymous request
*/


var express = require('express');
var websiteRouter = express.Router();
var controllers = require('../../api/controllers');

/**
 ** @descriptions implements user get methods
*/

websiteRouter.get('/', controllers.website.welcome.index);
websiteRouter.get('/login', controllers.website.welcome.login);
websiteRouter.get('/signup', controllers.website.welcome.signup);


websiteRouter.get('/home', controllers.api.welcome.home);
websiteRouter.get('/*', controllers.api.welcome.home);

/**
 ** @user authentification logic
*/
websiteRouter.post('/login', controllers.website.welcome.loginFromWebsite);
websiteRouter.post('/signup', controllers.website.welcome.signupFromWebsite);


module.exports = websiteRouter;
