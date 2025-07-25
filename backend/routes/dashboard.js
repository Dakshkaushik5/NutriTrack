const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserDashboard } = require('../controllers/dashboardController');

// @route   GET api/dashboard/me
// @desc    Get current user's dashboard data
// @access  Private
router.get('/me', auth, getUserDashboard);

module.exports = router;
