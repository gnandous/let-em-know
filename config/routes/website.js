/**
  @description :: will handle all anonymous request
*/


var express = require('express');
var websiteRouter = express.Router();
var controllers = require('../../api/controllers');


websiteRouter.get('/', controllers.website.welcome.index);
websiteRouter.get('/login', controllers.website.welcome.login);
/**
 ** @user authentification logic
*/
websiteRouter.post('/login', controllers.website.welcome.login);


module.exports = websiteRouter;
