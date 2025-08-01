const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getAllPlanRequests } = require('../controllers/adminController');

// @route   GET api/admin/plan-requests
// @desc    Get all diet plan requests
// @access  Private, Admin
router.get('/plan-requests', [auth, admin], getAllPlanRequests);

module.exports = router;
