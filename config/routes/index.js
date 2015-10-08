var passport = require('../../api/policies/authPolicie');

module.exports = function(app){
  app.use(passport.initialize());
  app.use('/api', require('./api'));
  app.use('/', require('./website'));
}
