const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Registreren
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser,  (err, user) => {
    if (err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err; // throw error
    if (!user) { // if there is no error and no user
      return res.json({success: false, msg: 'Username not found'});
    }
    // If there is a user...
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err; // throw error
      if (isMatch) { // If there is a user found
        const token = jwt.sign(user, config.secret, {
          expiresIn: 360000 // 100 hour
        });

        // Response to the frontend
        res.json({
          success: true, // There is success
          msg: 'You have successfully logged in',
          token: 'JWT ' + token, // There is a JWT token
          user: { // and there is a user object with chosen format
            id: user._id,
            name: user.name,
            username: user.username
          }
        });
      } else {
        return res.json({success: false, msg: 'Password does not match username'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;
