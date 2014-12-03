/**
 * WelcomeController.js
 *
 * @description :: Server-side logic for managing logged users.
 */

module.exports = {

  index: function(req, res, next){
    console.log(req.user);
    res.render('api/index', {title: 'hello-world', description: 'page generated by API::WelcomeController::index'});
  }
}
