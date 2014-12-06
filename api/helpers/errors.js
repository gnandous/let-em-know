// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** error.js - Middleware that handling errors after requests.
// ** @return   Error status or 500.
//
// ***********************************************************************//

// ********************************** START ******************************//


module.exports = {
  // development error handler
  // will return err
  _500: function(err, req, res, next){
    console.log(err.stack);
    res.status(err.status || 500);
    res.send(err);
  },
  // handle 404 errors for not found pages
  _404: function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    // create 404 view and render it
  }
}
