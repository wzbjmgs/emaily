//keys.js - figure out what set of credentials to return
//This is only used for back end. no way to use in front end
if (process.env.NODE_ENV == 'production') {
  //we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  //we are in dev, return the dev keys!!!
  //first require the dev.js then export interval
  module.exports = require('./dev');
}
