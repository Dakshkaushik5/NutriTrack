const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getAllPlanRequests } = require('../controllers/adminController');
const { updatePlanRequestStatus } = require('../controllers/adminController'); 

// @route   GET api/admin/plan-requests
// @desc    Get all diet plan requests
// @access  Private, Admin
router.get('/plan-requests', [auth, admin], getAllPlanRequests);

//PUT api/admin/plan-requests/:id
router.put('/plan-requests/:id', updatePlanRequestStatus);


module.exports = router;


