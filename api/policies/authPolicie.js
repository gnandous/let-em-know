// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** authPolicie.js - user authentification strategie..
// ** @return   passport object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer');
var User = require('../models/UserModel');

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
