module.exports = function(app){
  app.use('/api', require('./api'));
  app.use('/', require('./website'));
}
