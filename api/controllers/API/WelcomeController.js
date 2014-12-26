/**
 * WelcomeController.js
 *
 * @description :: Server-side logic for managing logged users.
 */

module.exports = {

  index: function(req, res, next){
    res.send("ok this is my controller return from api");
    // TODO index action (retrieve users informations)
  },

  /**
   ** @user api home page for website user
  */

  home: function(req, res, next){
    if (req.cookies.ltk_sessionToken === undefined){
      return res.redirect("/login");
    }
    else{
      return res.render('api/index');
    }
  }
}
