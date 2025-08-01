const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');
const Order = require('../models/Order');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @route   POST api/payment/create-order
// @desc    Create a Razorpay order
// @access  Private
exports.createOrder = async (req, res) => {
  const { amount, planRequestId } = req.body;

  const options = {
    amount: amount * 100, // amount in the smallest currency unit (paise)
    currency: 'INR',
    receipt: shortid.generate(),
  };

  try {
    const response = await razorpay.orders.create(options);

    // Save order details to our database
    const newOrder = new Order({
      user: req.user.id,
      planRequest: planRequestId,
      razorpay: {
        orderId: response.id,
      },
      amount: amount,
    });
    await newOrder.save();

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @route   POST api/payment/verify
// @desc    Verify payment signature
// @access  Private
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');
  
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Payment is authentic, update order in DB
    await Order.findOneAndUpdate(
      { 'razorpay.orderId': razorpay_order_id },
      {
        status: 'paid',
        'razorpay.paymentId': razorpay_payment_id,
        'razorpay.signature': razorpay_signature,
      }
    );
    res.json({ success: true, message: 'Payment successful' });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};
