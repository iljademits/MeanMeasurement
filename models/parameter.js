const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema
const ParameterSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  code : {
    type: String,
    required: true
  },
  unit : {
    type: String,
    required: true
  },
  upperlimit : {
    type: Number
  },
  lowerlimit : {
    type: Number
  }
});

const Parameter = module.exports = mongoose.model('Parameter', ParameterSchema);

module.exports.getAllParameters = function (callback) {
  Parameter.find(callback);
}
