var passport = require('../../api/policies/authPolicie');

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', require('./api')(passport));
  app.use('/', require('./website'));
}
