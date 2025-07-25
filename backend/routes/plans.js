const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { submitPlanRequest } = require('../controllers/planController');

// @route   POST api/plans/submit
// @desc    Submit a diet plan request
// @access  Private
router.post('/submit', auth, submitPlanRequest);

module.exports = router;
