const DietPlanRequest = require('../models/DietPlanRequest');
const sendEmail = require('../utils/sendEmail'); // Import our new email utility

// @route   GET api/admin/plan-requests
// @desc    Get all user diet plan requests
// @access  Private, Admin
exports.getAllPlanRequests = async (req, res) => {
  try {
    const allRequests = await DietPlanRequest.find().populate('user', ['name', 'email']).sort({ date: -1 });
    res.json(allRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/admin/plan-requests/:id
// @desc    Update the status of a diet plan request and send email
// @access  Private, Admin
exports.updatePlanRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedRequest = await DietPlanRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', ['name', 'email']);

    if (!updatedRequest) {
      return res.status(404).json({ msg: 'Plan request not found' });
    }

    // --- NEW: Send Email Notification ---
    if (status === 'Completed') {
      try {
        const emailHtml = `
          <h1>Your Diet Plan is Ready!</h1>
          <p>Hello ${updatedRequest.user.name},</p>
          <p>Great news! Your personalized diet plan for your goal of "${updatedRequest.healthGoals.primaryGoal}" is now complete.</p>
          <p>Your dietitian will send it to you via your preferred contact method shortly. If you have any questions, feel free to reach out.</p>
          <p>Thank you for choosing NutriTrack!</p>
        `;

        await sendEmail({
          email: updatedRequest.user.email,
          subject: 'Your NutriTrack Diet Plan is Ready!',
          html: emailHtml,
        });

        console.log('Completion email sent successfully.');
      } catch (emailError) {
        console.error('Failed to send completion email:', emailError);
        // We don't stop the process, just log the error. The status update is more critical.
      }
    }

    res.json(updatedRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};