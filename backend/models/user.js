const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// This line checks if the model is already compiled and uses the existing one if it is.
module.exports = mongoose.models.user || mongoose.model('user', UserSchema);
