const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, sort, limit } = req.query;
    let query = {};

    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    let productsQuery = Product.find(query);

    if (sort) {
      const sortOrder = sort === 'price-asc' ? 1 : -1;
      productsQuery = productsQuery.sort({ price: sortOrder });
    }

    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }

    const products = await productsQuery.exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
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

// Create new product (Admin only)
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    const product = new Product({
      ...req.body,
      images: imageUrls
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : product.images;
    
    Object.assign(product, req.body, { images: imageUrls });
    const updatedProduct = await product.save();
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check stock for a specific shoe variant
router.get('/products/:id/variant-stock', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    const { color, size } = req.query;
    const product = await Product.findById(req.params.id);
    if (!product || product.category !== 'shoes' || !product.variants) {
      return res.status(404).json({ message: 'Shoe not found or no variants' });
    }
    const variant = product.variants.find(v => v.color === color);
    if (!variant) {
      return res.status(404).json({ message: 'Color not found' });
    }
    const sizeObj = variant.sizes.find(s => s.size === size);
    if (!sizeObj) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.json({ inStock: sizeObj.inStock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 