const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0,
    default: null // Price before discount, if any
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: null // Percentage off, if any
  },
  category: {
    type: String,
    required: true,
    enum: ['watches', 'jewelry', 'bags', 'accessories', 'clothing', 'shoes']
  },
  images: [{
    type: String
  }],
  brand: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  weight: Number,
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 1,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 