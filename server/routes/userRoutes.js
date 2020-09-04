const express = require('express');
const routers = require('express-promise-router')();
const passport = require('passport');

// local file url
const passportConfig = require('../passport');
const UserController = require('../controllers/userController');
const { validateBody, schemas } = require('../helpers/routeHelpers');

// validation function
const passportAuth = passport.authenticate('local', { session: false });
const passportAuthJWT = passport.authenticate('jwt', { session: false });
const validatBody = validateBody(schemas.authSchema);
const googleIn = passport.authenticate('googleToken', { session: false });
const facebookIn = passport.authenticate('facebookToken', { session: false });


// signUP route
routers.route('/signup')
    .post(validatBody, UserController.signUp);

// signIn route
routers.route('/signin')
    .post(validatBody, passportAuth, UserController.signIn);

// google route
routers.route('/oauth/google')
    .post(googleIn, UserController.googleOAuth);

// facebook route
routers.route('/oauth/facebook')
    .post(facebookIn, UserController.facebookOAuth);

// secret route for auth user
routers.route('/secret')
    .get(passportAuthJWT, UserController.secret);

module.exports = routers;