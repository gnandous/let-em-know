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

    // =======================================================================//
    // ! USERS
    // =======================================================================//
    /* @all user other post methods */

    ApiRouter.post('/user', controllers.api.user.create);
    ApiRouter.post('/user/:id', controllers.api.user.update);

    /* @all user get methods */

    ApiRouter.get('/', passport.authenticate(BAERER, {session: false}), controllers.api.welcome.index);
    ApiRouter.get('/users', controllers.api.user.index);
    ApiRouter.get('/user/:user_id', controllers.api.user.read);
    ApiRouter.get('/user/:id/remove', controllers.api.user.destroy);

    // =======================================================================//
    // ! TALENT
    // =======================================================================//
    /* @all talent post methods */

    ApiRouter.post('/talent', controllers.api.talent.create);
    ApiRouter.post('/talent/:id', controllers.api.talent.update);

    /* @all talent get methods */

    ApiRouter.get('/talents', controllers.api.talent.index);
    ApiRouter.get('/talent/:talent_id', controllers.api.talent.read);
    ApiRouter.get('/talent/:id/remove', controllers.api.talent.destroy);


    // =======================================================================//
    // ! POST
    // =======================================================================//
    /* @all post post methods */

    ApiRouter.post('/post', controllers.api.post.create);
    ApiRouter.post('/post/:id', controllers.api.post.update);

    /* @all post get methods */

    ApiRouter.get('/posts', controllers.api.post.index);
    ApiRouter.get('/post/:id', controllers.api.post.read);
    ApiRouter.get('/post/:id/remove', controllers.api.post.destroy);

    // =======================================================================//
    // ! COMMENT
    // =======================================================================//
    /* @all comment comment methods */

    ApiRouter.post('/comment', controllers.api.comment.create);
    ApiRouter.post('/comment/:id', controllers.api.comment.update);

    /* @all comment get methods */

    ApiRouter.get('/comments', controllers.api.comment.index);
    ApiRouter.get('/comment/:id', controllers.api.comment.read);
    ApiRouter.get('/comment/:id/remove', controllers.api.comment.destroy);

    // =======================================================================//
    // ! FOLLOW
    // =======================================================================//
    /* @all follow follow methods */

    ApiRouter.post('/follow', controllers.api.follow.create);
    ApiRouter.post('/follow/:id', controllers.api.follow.update);

    /* @all follow get methods */

    ApiRouter.get('/follows', controllers.api.follow.index);
    ApiRouter.get('/follow/:id', controllers.api.follow.read);
    ApiRouter.get('/follow/:id/remove', controllers.api.follow.destroy);

    // =======================================================================//
    // ! LIKE
    // =======================================================================//
    /* @all like like methods */

    ApiRouter.post('/like', controllers.api.like.create);
    ApiRouter.post('/like/:id', controllers.api.like.update);

    /* @all like get methods */

    ApiRouter.get('/likes', controllers.api.like.index);
    ApiRouter.get('/like/:id', controllers.api.like.read);
    ApiRouter.get('/like/:id/remove', controllers.api.like.destroy);

    // =======================================================================//
    // ! STORY
    // =======================================================================//
    /* @all story story methods */

    ApiRouter.post('/story', controllers.api.story.create);
    ApiRouter.post('/story/:id', controllers.api.story.update);

    /* @all story get methods */

    ApiRouter.get('/stories', controllers.api.story.index);
    ApiRouter.get('/story/:id', controllers.api.story.read);
    ApiRouter.get('/story/:id/remove', controllers.api.story.destroy);

    // =======================================================================//
    // ! NOTIFICATION
    // =======================================================================//
    /* @all notification notification methods */

    ApiRouter.post('/notification', controllers.api.notification.create);
    ApiRouter.post('/notification/:id', controllers.api.notification.update);

    /* @all notification get methods */

    ApiRouter.get('/notifications', controllers.api.notification.index);
    ApiRouter.get('/notification/:id', controllers.api.notification.read);
    ApiRouter.get('/notification/:id/remove', controllers.api.notification.destroy);

    return (ApiRouter);
}
