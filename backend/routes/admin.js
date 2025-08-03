const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getAllPlanRequests } = require('../controllers/adminController');

// @route   GET api/admin/plan-requests
// @desc    Get all diet plan requests
// @access  Private, Admin
router.get('/plan-requests', [auth, admin], getAllPlanRequests);
<<<<<<< HEAD

module.exports = router;
=======

module.exports = router;

>>>>>>> aa9e7cd61d65f3c27ee11725d8d008a8fdbd1e8d
