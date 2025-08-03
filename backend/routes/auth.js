const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authcontroller');
// const { check } = require('express-validator'); // We will add validation later

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser); 

module.exports = router;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();
