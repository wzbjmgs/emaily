//root file for all initial setup of our application
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
//middleware to parse incoming request bodies
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
//when open the application
//all the services and models will be loaded
// User model has to be delcared first
//because passport want to use it
require('./models/Survey');
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

//bind bodyParser to app, so that app will use this middleware
//now any request with request body comes in,this middleware will parse the body,
//and assign it to req.body of the incoming request object
app.use(bodyParser.json());

//tell application to user cookieSession
//set up new cookieSession stracture
//app.use add middleware inside our application
//middlewares are small functions are used to modify incoming request
//before request is forwared to route handler
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
//passport.initialize also add user obj to req
app.use(passport.initialize());
app.use(passport.session());

//pass app variable into authRoutes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV == 'production') {
  //express will serve up prodiction assets
  //like our main.js file, main.css file
  //if someone looking for /clinet/build/static/js/main.js
  //look into client/build folder to see if any exist
  app.use(express.static('client/build'));

  //in another word, it will forward react route request to react server
  //Express will server up index.html if it doesn't regonize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*dynamic figure aout what port our app shuold listen to
if the port already been defined by heroku, then use that PORT
if not, then use default 5000
usually, 5000 for devp environment */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
