const express = require('express');
const routers = require('express-promise-router')();
const passport = require('passport');

// local file url
const passportConfig = require('../passport');
const UsersController = require('../controllers/userController');
const { validateBody, schemas } = require('../helpers/routeHelpers');


const passportSignIn = passport.authenticate();
const passportJWT = passport.authenticate('jwt', { session: false });

routers.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

routers.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

routers.route('/signout')
    .get(passportJWT, UsersController.signOut);

routers.route('/oauth/google')
    .post(passport.authenticate('google', { session: false }), UsersController.googleOAuth);

routers.route('/oauth/facebook')
    .post(passport.authenticate('facebook', { session: false }), UsersController.facebookOAuth);

routers.route('/oauth/link/google')
    .post(passportJWT, passport.authorize('google', { session: false }), UsersController.linkGoogle);

routers.route('/oauth/unlink/google')
    .post(passportJWT, UsersController.unlinkGoogle);

routers.route('/oauth/link/facebook')
    .post(passportJWT, passport.authorize('facebook', { session: false }), UsersController.linkFacebook);

routers.route('/oauth/unlink/facebook')
    .post(passportJWT, UsersController.unlinkFacebook);

routers.route('/dashboard')
    .get(passportJWT, UsersController.dashboard);

routers.route('/status')
    .get(passportJWT, UsersController.checkAuth);

module.exports = routers;