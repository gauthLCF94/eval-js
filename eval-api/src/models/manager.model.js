const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manager = new Schema({
  lastname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
  },
  phone: {
    type: Number,
    required: true,
    minlength:10,
    maxlength:10
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Manager', manager);
