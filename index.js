//root file
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
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

//pass app variable into authRoutes
require('./routes/authRoutes')(app);

/*dynamic figure aout what port our app shuold listen to
if the port already been defined by heroku, then use that PORT
if not, then use default 5000
usually, 5000 for devp environment */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
