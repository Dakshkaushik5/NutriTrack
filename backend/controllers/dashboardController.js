const DietPlanRequest = require('../models/DietPlanRequest');
const User = require('../models/User');

// @route   GET api/dashboard/me
// @desc    Get current user's profile and plan requests
// @access  Private
exports.getUserDashboard = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select('-password');
    const planRequests = await DietPlanRequest.find({ user: req.user.id }).sort({ date: -1 });

    res.json({ userProfile, planRequests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
