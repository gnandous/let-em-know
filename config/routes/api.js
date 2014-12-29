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
    // secure all post methods
    ApiRouter.post('/*', passport.authenticate(BAERER, {session: false}));
    ApiRouter.post('/user/:id', controllers.api.user.update);

    /* @all user get methods */

    // secure all get methods
    ApiRouter.get('/*', passport.authenticate(BAERER, {session: false}));
    ApiRouter.get('/', controllers.api.welcome.index);
    ApiRouter.get('/users', controllers.api.user.index);
    ApiRouter.get('/user/:user_id', controllers.api.user.read);
    ApiRouter.get('/user/:id/remove', controllers.api.user.destroy);
    ApiRouter.get('/current_user', controllers.api.user.current);

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
    ApiRouter.post('/post/media/upload', controllers.api.post.upload);

    /* @all post get methods */

    ApiRouter.get('/posts', controllers.api.post.index);
    ApiRouter.get('/user_posts/:user_id', controllers.api.post.user_posts);
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
    ApiRouter.get('/post_comments/:post_id', controllers.api.comment.postComments);
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
    ApiRouter.get('/user_followings/:id', controllers.api.follow.userFollowings);
    ApiRouter.get('/user_followers/:id', controllers.api.follow.userFollowers);
    ApiRouter.get('/unfollow/:follower_id/:following_id', controllers.api.follow.destroyFollow);
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
    ApiRouter.get('/user_likes/:user_id', controllers.api.like.user_likes);
    ApiRouter.get('/unlike/:user_id/:post_id', controllers.api.like.destroyLike);
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
    ApiRouter.get('/notifications/unread/:from/:to', controllers.api.notification.unreadNotifications);
    ApiRouter.get('/notification/:id/remove', controllers.api.notification.destroy);

    // =======================================================================//
    // ! Medias
    // =======================================================================//

    ApiRouter.post('/medias', controllers.api.medias.handleSent);

    return (ApiRouter);
}
