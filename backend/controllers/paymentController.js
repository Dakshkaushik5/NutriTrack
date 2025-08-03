const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');
const Order = require('../models/Order');
const User = require('../models/User');
const DietPlanRequest = require('../models/DietPlanRequest');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

exports.createOrder = async (req, res) => {
  const { amount, planRequestId } = req.body;
  const options = { amount: amount * 100, currency: 'INR', receipt: shortid.generate() };
  try {
    const response = await razorpay.orders.create(options);
    const newOrder = new Order({ user: req.user.id, planRequest: planRequestId, razorpay: { orderId: response.id }, amount });
    await newOrder.save();
    res.json({ id: response.id, currency: response.currency, amount: response.amount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');
  
  if (expectedSignature === razorpay_signature) {
    const order = await Order.findOneAndUpdate({ 'razorpay.orderId': razorpay_order_id }, { status: 'paid', 'razorpay.paymentId': razorpay_payment_id, 'razorpay.signature': razorpay_signature });

    // --- 2. Send Detailed Notification Email to Admin ---
    try {
      const user = await User.findById(order.user);
      const planRequest = await DietPlanRequest.findById(order.planRequest);
      const formatArray = (arr) => arr && arr.length > 0 && arr[0] !== '' ? arr.join(', ') : 'None';

      const emailHtml = `
        <h1>New Diet Plan Order! (#${order.razorpay.orderId})</h1>
        <p>A new plan has been requested and successfully paid for. Here are the full details:</p>
        
        <h3>Client Information:</h3>
        <ul>
            <li><strong>Name:</strong> ${user.name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
        </ul>

        <h3>Personal Information:</h3>
        <ul>
            <li><strong>Age:</strong> ${planRequest.personalInfo.age}</li>
            <li><strong>Gender:</strong> ${planRequest.personalInfo.gender}</li>
            <li><strong>Height:</strong> ${planRequest.personalInfo.height} cm</li>
            <li><strong>Weight:</strong> ${planRequest.personalInfo.weight} kg</li>
        </ul>

        <h3>Health Goals:</h3>
        <ul>
            <li><strong>Primary Goal:</strong> ${planRequest.healthGoals.primaryGoal}</li>
            <li><strong>Target Weight:</strong> ${planRequest.healthGoals.targetWeight ? planRequest.healthGoals.targetWeight + ' kg' : 'Not specified'}</li>
        </ul>

        <h3>Dietary Preferences:</h3>
        <ul>
            <li><strong>Food Type:</strong> ${planRequest.dietaryPreferences.foodType}</li>
            <li><strong>Allergies:</strong> ${formatArray(planRequest.dietaryPreferences.allergies)}</li>
            <li><strong>Disliked Foods:</strong> ${formatArray(planRequest.dietaryPreferences.dislikedFoods)}</li>
        </ul>

        <h3>Medical History:</h3>
        <ul>
            <li><strong>Conditions:</strong> ${formatArray(planRequest.medicalHistory.conditions)}</li>
        </ul>

        <p style="margin-top: 20px;">You can now log in to your admin dashboard to view this request and mark it as 'Completed' once the plan is sent.</p>
      `;
      await sendEmail({ email: process.env.ADMIN_EMAIL, subject: `New Order from ${user.name}`, html: emailHtml });
      console.log(`New detailed order notification sent to admin for user ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
    }
    // --- End of email logic ---

    res.json({ success: true, message: 'Payment successful' });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};
