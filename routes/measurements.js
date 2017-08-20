const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Measurement = require('../models/measurement');

router.post('/fetch', (req, res, next) => {
  const code = req.body.code;
  console.log(code);
  Measurement.getMeasurementsByParameterCode(code, (err, measurements) => {
    if (err) throw err;
    if (!measurements) {
      return res.json({success: false, msg: 'No measurements found!'})
    }
    res.json({
      success: true,
      msg: 'See these measurements',
      measurements: measurements
    })
  });
});

// Opslaan
router.post('/input', (req, res, next) => {
  let newMeasurement = new Measurement({
    code: req.body.code,
    value: req.body.value,
    created: req.body.created
  });

  Measurement.saveMeasurement(newMeasurement, (err, measurement) => {
    if (err) {
      res.json({success: false, msg: 'Failed to save measurement'});
    } else {
      res.json({success: true, msg: 'Measurement saved'});
    }
  });
});


module.exports = router;
