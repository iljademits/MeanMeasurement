const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema
const MeasurementSchema = mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  value : {
    type: Number,
    required: true
  },
  created : {
    type: Date,
    required: true
  }
});

const Measurement = module.exports = mongoose.model('Measurement', MeasurementSchema);

module.exports.saveMeasurement = function (newMeasurement, callback) {
  newMeasurement.save(callback);
}

module.exports.getMeasurementsByParameterCode = function (parameterCode, callback) {
  const query = {code: parameterCode};
  Measurement.find(query, callback);
}
