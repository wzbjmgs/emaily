const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    //GoogleStrategy has internal idenfier as google
    //whenever see google string, go to use GoogleStrategy
    passport.authenticate('google', {
      //we ask google to give us permission to access
      //profile and email address
      //google internally have different scope
      scope: ['profile', 'email']
    })
  );

  //set up second route handler to handle call back
  //request from google
  //big difference between these two route hanlders is that
  //second includes code to ask user info
  //passport.authenticate is a middleware and after it is completed, we
  //need to clearify what is next
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      //after successfully login, redirect to dashboard page
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    //logout is the function attached to req automatically
    //by passport
    req.logout();
    //kills user id stored in cookie
    //res.send(req.user);
    res.redirect('/');
  });

  //user login, passport get user info from cookie
  //then deserialzie User, add user object into req.
  //res.send send back to front end
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
