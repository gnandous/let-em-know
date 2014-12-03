// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** SecureUrlPolicie - URL secure..
// ** @return   return 401 or next .
//
// ***********************************************************************//

// ********************************** START ******************************//

module.exports = function(req, res, next){
  if(req.session.passport.user === undefined){ res.redirect('/login');}
  else
    next();
}
