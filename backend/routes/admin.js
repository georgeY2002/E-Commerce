const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo'
});

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to upload image to Cloudinary
const uploadToCloudinary = async (imageBuffer) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'ecommerce-products',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(imageBuffer);
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};

// Helper function to process images (URLs or base64)
const processImages = async (images) => {
  const processedImages = [];
  
  for (const image of images) {
    if (image.startsWith('data:image')) {
      // Base64 image - convert to buffer and upload to Cloudinary
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const cloudinaryUrl = await uploadToCloudinary(buffer);
      processedImages.push(cloudinaryUrl);
    } else if (image.startsWith('http')) {
      // URL image - upload to Cloudinary
      try {
        const result = await cloudinary.uploader.upload(image, {
          folder: 'ecommerce-products',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' }
          ]
        });
        processedImages.push(result.secure_url);
      } catch (error) {
        // Keep original URL if Cloudinary upload fails
        processedImages.push(image);
      }
    } else {
      // Invalid image format - skip
    }
  }
  
  return processedImages;
};

// Get admin dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Use Promise.all for parallel execution
    const [
      totalEarnings,
      monthlyEarnings,
      yearlyEarnings,
      totalOrders,
      completedOrders,
      pendingOrders,
      lowStockProducts
    ] = await Promise.all([
      // Total earnings
      Order.aggregate([
        { 
          $match: { 
            orderStatus: { $nin: ['cancelled', 'returned'] },
            paymentStatus: 'completed'
          }
        },
        { $group: { _id: null, total: { $sum: '$adminEarnings' } } }
      ]),
      
      // Monthly earnings
      Order.aggregate([
        { 
          $match: { 
            orderStatus: { $nin: ['cancelled', 'returned'] },
            paymentStatus: 'completed',
            createdAt: { $gte: startOfMonth }
          }
        },
        { $group: { _id: null, total: { $sum: '$adminEarnings' } } }
      ]),
      
      // Yearly earnings
      Order.aggregate([
        { 
          $match: { 
            orderStatus: { $nin: ['cancelled', 'returned'] },
            paymentStatus: 'completed',
            createdAt: { $gte: startOfYear }
          }
        },
        { $group: { _id: null, total: { $sum: '$adminEarnings' } } }
      ]),
      
      // Total orders
      Order.countDocuments(),
      
      // Completed orders
      Order.countDocuments({ paymentStatus: 'completed' }),
      
      // Pending orders
      Order.countDocuments({ orderStatus: 'pending' }),
      
      // Low stock products
      Product.countDocuments({ stockQuantity: { $lt: 5 } })
    ]);

    res.json({
      totalEarnings: totalEarnings[0]?.total || 0,
      monthlyEarnings: monthlyEarnings[0]?.total || 0,
      yearlyEarnings: yearlyEarnings[0]?.total || 0,
      totalOrders,
      completedOrders,
      pendingOrders,
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders with pagination
router.get('/orders', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentStatus } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.orderStatus = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name images price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get earnings breakdown
router.get('/earnings', async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let startDate;

    switch (period) {
      case 'week':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(new Date().getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    }

    const earnings = await Order.aggregate([
      {
        $match: {
          orderStatus: { $nin: ['cancelled', 'returned'] },
          paymentStatus: 'completed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          dailyEarnings: { $sum: '$adminEarnings' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(earnings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top selling products
router.get('/top-products', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Update order status (admin)
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber, estimatedDelivery, notes } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const previousOrderStatus = order.orderStatus;
    const previousPaymentStatus = order.paymentStatus;

    // Update order fields
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;
    if (notes) order.notes = notes;

    // Handle stock restoration for cancelled/returned orders
    if ((orderStatus === 'cancelled' || orderStatus === 'returned') && 
        previousOrderStatus !== 'cancelled' && previousOrderStatus !== 'returned') {
      
      // Restore stock for all items in the order
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockQuantity += item.quantity;
          if (product.stockQuantity > 0) {
            product.inStock = true;
          }
          await product.save();
        }
      }
    }

    // Handle stock deduction for orders that were cancelled/returned but are now active again
    if (previousOrderStatus === 'cancelled' || previousOrderStatus === 'returned') {
      if (orderStatus !== 'cancelled' && orderStatus !== 'returned') {
        // Deduct stock again for reactivated orders
        for (const item of order.items) {
          const product = await Product.findById(item.product);
          if (product) {
            product.stockQuantity -= item.quantity;
            if (product.stockQuantity <= 0) {
              product.inStock = false;
            }
            await product.save();
          }
        }
      }
    }

    const updatedOrder = await order.save();
    
    // Populate the response
    await updatedOrder.populate('user', 'name email');
    await updatedOrder.populate('items.product', 'name images price');
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products (admin)
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search, sort } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    let productsQuery = Product.find(query);

    if (sort) {
      const [field, order] = sort.split('-');
      const sortOrder = order === 'desc' ? -1 : 1;
      productsQuery = productsQuery.sort({ [field]: sortOrder });
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    const products = await productsQuery
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product (admin)
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new product (admin)
router.post('/products', async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // Process images if provided
    if (req.body.images && Array.isArray(req.body.images)) {
      try {
        const processedImages = await processImages(req.body.images);
        productData.images = processedImages;
      } catch (error) {
        // Continue without images if processing fails
        productData.images = [];
      }
    }
    
    const product = new Product(productData);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ message: error.message });
  }
});

// Update product (admin)
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (admin)
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 