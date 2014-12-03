/**
 * WelcomeController.js
 *
 * @description :: Server-side logic for managing anonyme users.
 */

module.exports = {

  // implements index method

  index: function(req, res, next){
    res.render('index', { title: 'Hello world', description: '<< this page is generated by WelcomeController >>' });
  },

  // =======================================================================//
  // @description :: Implements login logic
  // @return ::  User data through json forma                                //
  // =======================================================================//

  login: function(req, res, next){
    var errors = [];
    if (!req.body.pseudo) {
      errors.push({
        field: 'pseudo',
        error: 'pseudo must be filled',
        value: req.body.pseudo
      });
    }
    if (!req.body.password) {
      errors.push({
        field: 'password',
        error: 'password must be a valid email',
        value: req.body.password
      });
    }
    if (errors.length) {
      console.log("souleymane");
      res.render('login', {messages: errors});
    }
    // TODO retrieve && return user
  }
}
