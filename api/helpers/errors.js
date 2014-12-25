// ******************************* INFORMATION ***************************//

// ***********************************************************************//
//
// ** error.js - Middleware that handling errors after requests.
// ** @return   Error status or 500.
//
// ***********************************************************************//

// ********************************** START ******************************//


module.exports = {
  _500: function(err, req, res, next){
    console.log(err.stack);
    res.status(err.status || 500);
    if(req.accepts('html')){
      // TODO redirects to /errors to display errors stack
    }
    if(req.accepts('json')){
      res.send(err);
    }
    else
      res.send(err);
  },
  _404: function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    // create 404 view and render it if view accept html
  }
}
