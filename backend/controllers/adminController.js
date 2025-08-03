const DietPlanRequest = require('../models/DietPlanRequest');
const sendEmail = require('../utils/sendEmail');

exports.getAllPlanRequests = async (req, res) => {
  try {
    const allRequests = await DietPlanRequest.find().populate('user', ['name', 'email']).sort({ date: -1 });
    res.json(allRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updatePlanRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedRequest = await DietPlanRequest.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('user', ['name', 'email']);
    if (!updatedRequest) {
      return res.status(404).json({ msg: 'Plan request not found' });
    }

    // --- 3. Send Plan Completion Email to User ---
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
        console.log(`Completion email sent to ${updatedRequest.user.email}`);
      } catch (emailError) {
        console.error('Failed to send completion email:', emailError);
      }
    }
    // --- End of email logic ---

    res.json(updatedRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPlanRequestById = async (req, res) => {
    try {
      const request = await DietPlanRequest.findById(req.params.id).populate('user', ['name', 'email']);
      if (!request) return res.status(404).json({ msg: 'Request not found' });
      res.json(request);
    } catch (err) {
      res.status(500).send('Server Error');
    }
};
