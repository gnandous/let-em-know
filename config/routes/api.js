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


    //POST
    /* @all post post methods */

    ApiRouter.post('/post', controllers.api.post.create);
    ApiRouter.post('/post/:id', controllers.api.post.update);

    /* @all post get methods */

    ApiRouter.get('/posts', controllers.api.post.index);
    ApiRouter.get('/post/:id', controllers.api.post.read);
    ApiRouter.get('/post/:id/remove', controllers.api.post.destroy);
    
    //COMMENT
    /* @all comment comment methods */

    ApiRouter.post('/comment', controllers.api.comment.create);
    ApiRouter.post('/comment/:id', controllers.api.comment.update);

    /* @all comment get methods */

    ApiRouter.get('/comments', controllers.api.comment.index);
    ApiRouter.get('/comment/:id', controllers.api.comment.read);
    ApiRouter.get('/comment/:id/remove', controllers.api.comment.destroy);
    return (ApiRouter);
}
