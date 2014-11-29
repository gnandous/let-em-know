/**
 * UserController.js
 *
 * @description :: Server-side logic for managing users.
 */

module.exports = {

  index: function(req, res, next){
    return res.render('index', { title: 'Hello world' });
  },

  create: function(req, res, next){
    // TODO handle controller behavior
  },

  destroy: function(req, res, next){
    // TODO handle controller behavior
  }
}
