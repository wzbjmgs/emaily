//next is when our middleware is completed, the next middleware
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!!!' });
  }

  //go to next middleware
  next();
};
