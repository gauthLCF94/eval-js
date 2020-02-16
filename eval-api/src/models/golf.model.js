const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golf = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  descrition: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  manager: {
    type: Object,
    unique: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Golf', golf);
