// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** authPolicie.js - user authentification strategie..
// ** @return   passport object.
//
// ***********************************************************************//

// ********************************** START ******************************//

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/UserModel');

passport.use(new LocalStrategy({
    passReqToCallback : true
  },
  function(req, pseudo, password, done) {

    User.findOne({ pseudo: pseudo }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        //return done(null, false, {message: 'Invalid username'});
        return done(null, false, req.flash('username', 'pseudo is Incorrect'));
      }
      user.comparePassword(password, function(err, isMatch){
        if (!isMatch){ return done(null, false, req.flash('password', 'password is not valid'));}
        return done(null, user);
      });
    });
  }
));


passport.serializeUser(function(user, done){
  done(null, user);

});
passport.deserializeUser(function(user, done){
  done(null, {user: user});
});


module.exports = passport;
