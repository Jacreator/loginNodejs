const JWT = require('jsonwebtoken');
const UserModel = require('../models/userModels');
const { JWT_SECRET } = require('../configuration');

// this function generates token and takes user for user id
tokenGen = user => {
    return JWT.sign({
        iss: 'buzzroom',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setTime(new Date().getTime() + 1)
    }, JWT_SECRET);
};

module.exports = {
    signIn: async (req, resp, next) => {
        const userDetail = req.user;
        // Generate token
        const token = tokenGen(userDetail);
        // send the info to frontend
        resp.json({ token });
    },
    signUp: async (req, resp, next) => {
        // user Info
        const { email, password } = req.value.body;

        // check if user already exist in our database
        var foundUser = await UserModel.findOne({ email });
        if (foundUser) {
            return resp.status(403).json({ error: 'Email is already in use' });
        }

        // creating a new user
        const newUser = new UserModel({ email, password });
        await newUser.save();

        // response with token
        const token = tokenGen(newUser); // this use the function to generate token for newly created user
        resp.status(200).json({ token }); // send info to frontend

    },
    secret: async (req, resp, next) => {
        console.log('i managed to get here');
        console.log('UserControllers.secret called');
        resp.json({ secret: "resources " });
    }
};