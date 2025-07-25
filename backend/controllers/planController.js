const DietPlanRequest = require('../models/DietPlanRequest');

// @route   POST api/plans/submit
// @desc    Submit a diet plan request
// @access  Private
exports.submitPlanRequest = async (req, res) => {
  try {
    const { personalInfo, healthGoals, dietaryPreferences, medicalHistory } = req.body;

    const newPlanRequest = new DietPlanRequest({
      user: req.user.id, // Comes from the auth middleware
      personalInfo,
      healthGoals,
      dietaryPreferences,
      medicalHistory,
    });

    const planRequest = await newPlanRequest.save();
    res.json(planRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
