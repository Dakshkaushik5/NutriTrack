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
    // Payment is authentic, update order in DB
    const order = await Order.findOneAndUpdate(
      { 'razorpay.orderId': razorpay_order_id },
      {
        status: 'paid',
        'razorpay.paymentId': razorpay_payment_id,
        'razorpay.signature': razorpay_signature,
      }
    );

    // --- NEW: Send Notification Email to Admin ---
    try {
        const user = await User.findById(order.user);
        const emailHtml = `
            <h1>New Diet Plan Order!</h1>
            <p>You have received a new diet plan request and successful payment.</p>
            <h3>Client Details:</h3>
            <ul>
                <li><strong>Name:</strong> ${user.name}</li>
                <li><strong>Email:</strong> ${user.email}</li>
            </ul>
            <p>Please log in to your admin dashboard to view the full details of the request and prepare their plan.</p>
        `;
        await sendEmail({
            email: process.env.ADMIN_EMAIL,
            subject: `New Order from ${user.name}`,
            html: emailHtml,
        });
        console.log(`New order notification sent to admin for user ${user.email}`);
    } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
    }
    // --- End of new code ---

    res.json({ success: true, message: 'Payment successful' });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
}

// (Remove this entire duplicated block, as the detailed email logic should be implemented inside the main if block above)
