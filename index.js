//root file for all initial setup of our application
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
//when open the application
//all the services and models will be loaded
// User model has to be delcared first
//because passport want to use it
require('./services/passport');

//https://mlab.com/databases/emaily-jayden-dev#users
//go to this mongodb remote website to get the connection URL
//do not copy the link directly here because everyone else
//can get this link from git and then can access to our database
mongoose.connect(keys.mongoURI);

/*new a running express app. We can setup multiple express app
majority applicaiton use single express app
this app used to setup configuration
keep listening income request and route request to handler*/
const app = express();

//tell application to user cookieSession
//set up new cookieSession stracture
app.use(
  cookieSession({
    //cookie last for 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//tell passport it should use cookies to handle authoration
//passport.initialize middleware is invoked on every request.
//It ensures the session contains a passport.user object, which may be empty.
//passport.session middleware is a Passport Strategy which will load the user
// object onto req.user if a serialised user object was found in the server.
//passport.deserializeUser is invoked on every request by passport.session.
//It enables us to load additional user information on every request.
//This user object is attached to the request as req.user making
//it accessible in our request handling.
app.use(passport.initialize());
app.use(passport.session());

//pass app variable into authRoutes
require('./routes/authRoutes')(app);

/*dynamic figure aout what port our app shuold listen to
if the port already been defined by heroku, then use that PORT
if not, then use default 5000
usually, 5000 for devp environment */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
