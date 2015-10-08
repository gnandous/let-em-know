'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./environnement');
var mongoose = require ('mongoose');
var multer = require('multer');
mongoose.connect(config.db.mongo_uri);

module.exports = configure;

/**
* Configure the application
* @param {Object} app - the express application
*/

function configure(app){

  app.set('views', path.join(__dirname, '..',  'api/views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // init passport
  app.use(require('../api/policies/authPolicie').initialize());

  app.use(express.static(path.join(__dirname, '..', 'client/public')));
  app.use(multer({dest: __dirname + '../' +  "/client/public/uploads"}));

  app.use(function (req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
  });
}
