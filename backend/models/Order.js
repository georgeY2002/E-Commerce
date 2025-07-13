const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Changed from true to false to support guest checkout
  },
  guestInfo: {
    name: String,
    email: String,
    phone: String
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['visa', 'cash_on_delivery']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: String,
  estimatedDelivery: Date,
  notes: String,
  adminEarnings: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
orderSchema.index({ createdAt: -1 }); // For sorting by date
orderSchema.index({ orderStatus: 1 }); // For filtering by order status
orderSchema.index({ paymentStatus: 1 }); // For filtering by payment status
orderSchema.index({ user: 1 }); // For user orders
orderSchema.index({ orderStatus: 1, paymentStatus: 1 }); // Compound index for dashboard queries
orderSchema.index({ createdAt: 1, orderStatus: 1, paymentStatus: 1 }); // For date range queries

module.exports = mongoose.model('Order', orderSchema); 