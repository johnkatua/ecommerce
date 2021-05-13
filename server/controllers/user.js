const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  const user = new User(req.body);
  console.log('new user', req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  })
};

exports.signin = (req, res) => {
  // find user based on email
  const {email, password} = req.body;
  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        err: 'User with that email does not exist. Please signup'
      })
    }
    // if user is found make sure the email and password match
    // create authentication method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: 'Email and password do not match'
      })
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    // persist token as 'tok' in cookie with expiry date
    res.cookie('tok', token, {expire: new Date() + 9999})
    // return response with user and token to frontend client
    const {_id, name, email, role} = user;
    return res.json({ token, user: {_id, name, email, role}})
  })
};

exports.signout = (req, res) => {
  res.clearCookie('tok');
  res.json({ message: 'Signout successfully' })
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256']
});
