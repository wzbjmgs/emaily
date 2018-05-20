const passport = require('passport');
//only care about strategy property, there are many other strategies
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//import keys file
const keys = require('../config/keys');

//set up strategy
//passport knows how to handle authoration in general
//but passport needs also to know which strategy to use
//add clientID and clientSecret into GoogleStrategy so that the strategy
//can identify our application
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //when user grant the permission, return back to our server
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);
