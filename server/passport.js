const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');

// Local file url
const { JWT_SECRET } = require('./configuration');
const User = require('./models/userModels');

// Json web token Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // if user dosen't exist! 
        if (!user) {
            return done(null, false);
        }

        // otherwise return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '47699222239-mh5pn801vqee713rjhcrpam93lnldamq.apps.googleusercontent.com',
    clientSecret: 'maIGTM0_Lwrl4w6WMmPywsiR',
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Could get accessed in two ways:
        // 1) When registering for the first time
        // 2) When linking account to the existing one

        // Should have full user profile over here
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        if (req.user) {
            // We're already logged in, time for linking account!
            // Add Google's data to an existing account
            req.user.methods.push('google');
            req.user.google = {
                id: profile.id,
                email: profile.emails[0].value
            };
            await req.user.save();
            return done(null, req.user);
        } else {
            //     // We're in the account creation process
            //     let existingUser = await User.findOne({ "google.id": profile.id });
            //     if (existingUser) {
            //         return done(null, existingUser);
            //     }

            //     // Check if we have someone with the same email
            //     existingUser = await User.findOne({ "local.email": profile.emails[0].value })
            //     if (existingUser) {
            //         // We want to merge google's data with local auth
            //         existingUser.methods.push('google');
            //         existingUser.google = {
            //             id: profile.id,
            //             email: profile.emails[0].value
            //         };
            //         await existingUser.save();
            //         return done(null, existingUser);
            //     }

            //     const newUser = new User({
            //         methods: ['google'],
            //         google: {
            //             id: profile.id,
            //             email: profile.emails[0].value
            //         }
            //     });

            //     await newUser.save();
            //     done(null, newUser);
        }
    } catch (error) {
        done(error, false, error.message);
    }
}));


//  Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // check if the user exist by email
        const user = await User.findOne({ email });

        // if not handle it
        if (!user) {
            return done(null, false);
        }

        // check if the user password is correct
        const isMatch = await user.isValidPassword(password);

        // if not handle it
        if (!isMatch) {
            return done(null, false);
        }

        // otherwise return the user
        done(null, user);
    } catch (error) {
        done(error);
    }

}));
