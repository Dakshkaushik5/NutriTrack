const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  planRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dietPlanRequest',
  },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('order', OrderSchema);
