/**
  @description :: will handle all request comming from angular api
*/

var express = require('express');
var ApiRouter = express.Router();
var controllers = require('../../api/controllers');

/* @all user post methods */

ApiRouter.post('/user', controllers.api.user.create);
ApiRouter.post('/user/:id', controllers.api.user.update);

/* @all user get methods */

ApiRouter.get('/users', controllers.api.user.index);
ApiRouter.get('/user/:id', controllers.api.user.read);
ApiRouter.get('/user/:id/remove', controllers.api.user.destroy);

module.exports = ApiRouter;
