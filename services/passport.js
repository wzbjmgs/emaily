const passport = require('passport');
//only care about strategy property, there are many other strategies
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//import keys file
const keys = require('../config/keys');
const mongoose = require('mongoose');
//fetch user from db
//one variable means fetch
//two variables mean load something new into db
// User is a collection back from db
const User = mongoose.model('users');

//define serializeUser fucntion
//next time deserialzie to get user info and then login
//first variable is the user model came back from db
//either a new created one or fetch the existing one
passport.serializeUser((user, done) => {
  //use user.id instead of user.googleID because users
  //may have different login strategy. They may use
  //facebook ID etc. user.id is the id automatically
  //generate by mongo
  done(null, user.id);
});

//first argument is the user id we stored in user cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
    //done function add user model to req.user
  });
});

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
      //this callback URI has to be the same with URI in Google API
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //if user profile id alreayd in db, skip creation part.
      User.findOne({ googleId: profile.id })
        //return promiss
        .then(existingUser => {
          if (existingUser) {
            //we alreayd have a record with given profile id
            //call done to resume the auth process
            //first parameter means no error here
            //second parameter is the user we found
            done(null, existingUser);
          } else {
            //we don't have a user record with this id, make a new record
            //use model class to create a new instance for user
            //if do not call save() function
            //the new user instance will not be saved into database
            //it will only exist in application memory
            new User({ googleId: profile.id })
              .save()
              //everytime we call save is a non sync process
              //user is the user object was just saved
              //.then is the promiss call back
              .then(user => done(null, user));
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  )
);
