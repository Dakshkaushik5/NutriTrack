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
exports.updatePlanRequest = async (req, res) => {
    try {
        let planRequest = await DietPlanRequest.findById(req.params.id);
        if (!planRequest) return res.status(404).json({ msg: 'Plan request not found' });
        if (planRequest.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });
        if (planRequest.status === 'Completed') return res.status(400).json({ msg: 'Cannot edit a completed plan' });
        const { personalInfo, healthGoals, dietaryPreferences, medicalHistory } = req.body;
        planRequest = await DietPlanRequest.findByIdAndUpdate(req.params.id, { $set: { personalInfo, healthGoals, dietaryPreferences, medicalHistory } }, { new: true });
        res.json(planRequest);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
