const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../config/database');
const Parameter = require('../models/parameter');

// Fetch the parameters
// router.get('/fetchAll', (req, res, next) => {
router.get('/fetchAll', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  Parameter.getAllParameters((err, parameters) => {
    if (err) throw err;
    if (!parameters) {
      return res.json({success: false, msg: 'No parameters found!'})
    }
    res.json({
      success: true,
      parameters: parameters
    })
  })
});

module.exports = router;
