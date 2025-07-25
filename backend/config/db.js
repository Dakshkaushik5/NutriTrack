/*
File: backend/config/db.js
Purpose: Handles the connection to the MongoDB database using Mongoose.
*/
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // The new versions of Mongoose don't require the extra options.
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
