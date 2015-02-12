 // ******************************* INFORMATION ***************************/

// ***********************************************************************//
//
// ** MediaController.js - Server-side logic for user profile media and
// ** all relative backoffice upload media
// ** @return   Notification controller object.
//
// ***********************************************************************//

// ********************************** START ******************************//

module.exports = {


  // =======================================================================//
  // ! Implements handleSent::action.                                       //
  // =======================================================================//


  handleSent: function(req, res, next){
    if (req.files)
      res.send("/uploads/" + req.files.file.name);
    else
      res.end();
  }



}
