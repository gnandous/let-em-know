// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** authPolicie.js - user authentification strategie..
// ** @return   passport object.
//
// ***********************************************************************//

// ********************************** START ******************************//

(function(){
  'use strict';

  var passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      BearerStrategy = require('passport-http-bearer'),
      User = require('../models/UserModel');

  passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: 'all' });
      });
    }
  ));

  module.exports = passport;
})();
