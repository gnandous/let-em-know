// ******************************* INFORMATION ***************************//

// ***********************************************************************//
// ** @description :: will handle all request comming from client         //
// ***********************************************************************//

// ********************************** START ******************************//

var express = require('express');
var ApiRouter = express.Router();
var controllers = require('../../api/controllers');
var BAERER = 'bearer';

module.exports = function(passport){

    //USER
    /* @all user other post methods */

    ApiRouter.post('/user', controllers.api.user.create);
    ApiRouter.post('/user/:id', controllers.api.user.update);

    /* @all user get methods */

    ApiRouter.get('/', passport.authenticate(BAERER, {session: false}), controllers.api.welcome.index);
    ApiRouter.get('/users', controllers.api.user.index);
    ApiRouter.get('/user/:user_id', controllers.api.user.read);
    ApiRouter.get('/user/:id/remove', controllers.api.user.destroy);

    //TALENT
    /* @all talent post methods */

    ApiRouter.post('/talent', controllers.api.talent.create);
    ApiRouter.post('/talent/:id', controllers.api.talent.update);

    /* @all talent get methods */

    ApiRouter.get('/talents', controllers.api.talent.index);
    ApiRouter.get('/talent/:talent_id', controllers.api.talent.read);
    ApiRouter.get('/talent/:id/remove', controllers.api.talent.destroy);
    return (ApiRouter);
}
