/**
 * WelcomeController.js
 *
 * @description :: Server-side logic for managing anonyme users.
 */

module.exports = {

  index: function(req, res, next){
    return res.render('index', { title: 'Hello world', description: '<< this page is generated by WelcomeController >>' });
  }
}