/**
  @description :: will handle all anonymous request
*/


var express = require('express');
var websiteRouter = express.Router();
var controllers = require('../../api/controllers');


websiteRouter.get('/', controllers.website.welcome.index);


module.exports = websiteRouter;
