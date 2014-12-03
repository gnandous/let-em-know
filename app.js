var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/environnement');
var mongoose = require ('mongoose');
var app = express();

mongoose.connect(config.db.mongo_uri);
// view engine setup
app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(cookieParser());

/*
app.use(session({
  key: 'session',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    host: 'localhost',
    port: '6379',
    db: 1
  })
}));
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/public')));

/* Will handle this later


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

Will hanlde this later */

module.exports = app;
