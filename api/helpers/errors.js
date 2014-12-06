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
    if(req.accepts('html')){
      // TODO redirects to /errors to display errors stack
    }
    if(req.accepts('json')){res.json(err);}
    res.send(err);
  },
  // handle 404 errors for not found pages
  _404: function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    // create 404 view and render it
  }
}
