const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  //app is the reference of express
  //second argument is the request handler
  //put requireLogin middleware as second middleare
  //express will take the reference(second argument) and run internally
  //when any new request come in.
  //we can pass as many middleware as we want
  //only request is that eventually there must have one fucntion to process
  //the user request and return back to user
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // console.log(req.body);

    //check whether user signed in
    //passport will go to get user object from cookie
    //if passpoart can't find and can't generate user obj into req.user
    //because of the requireLogin middleware, there is no need to manufally check
    // if (!req.user) {
    //   //401 unauthorized messages
    //   return res.status(401).send({ error: 'You must log in!' });
    // }

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    //aftr we successfully apply charge
    //we will add 5 credits and send user model back
    // console.log(charge);

    req.user.credits += 5;
    //commit change into db
    const user = await req.user.save();

    //send back to front end
    res.send(user);
  });
};
