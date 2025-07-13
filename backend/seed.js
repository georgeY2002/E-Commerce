const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // Example shoe with variants
  {
    name: "Air Max Runner",
    description: "Lightweight running shoes with responsive cushioning.",
    price: 2200,
    originalPrice: 2800,
    discountPercentage: 21,
    category: "shoes",
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=800"
    ],
    stockQuantity: 30,
    featured: true,
    variants: [
      {
        color: "Red",
        images: [
          "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=800",
          "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=801"
        ],
        sizes: [
          { size: "40", inStock: true },
          { size: "41", inStock: true },
          { size: "42", inStock: false }
        ]
      },
      {
        color: "Blue",
        images: [
          "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=802",
          "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=803"
        ],
        sizes: [
          { size: "40", inStock: true },
          { size: "41", inStock: false },
          { size: "42", inStock: true }
        ]
      }
    ]
  },
  // Another shoe
  {
    name: "Classic Leather",
    description: "Timeless leather sneakers for everyday style.",
    price: 1800,
    originalPrice: 2200,
    discountPercentage: 18,
    category: "shoes",
    brand: "Reebok",
    images: [
      "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=804"
    ],
    stockQuantity: 20,
    featured: false,
    variants: [
      {
        color: "White",
        images: [
          "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=804",
          "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=805"
        ],
        sizes: [
          { size: "39", inStock: true },
          { size: "40", inStock: true },
          { size: "41", inStock: false }
        ]
      },
      {
        color: "Black",
        images: [
          "https://images.unsplash.com/photo-1517260911205-8c1e1a0b6b8a?w=806"
        ],
        sizes: [
          { size: "39", inStock: false },
          { size: "40", inStock: true },
          { size: "41", inStock: true }
        ]
      }
    ]
  },
  // Example bag
  {
    name: "Elegant Tote Bag",
    description: "Spacious and stylish tote bag for daily essentials.",
    price: 950,
    originalPrice: 1200,
    discountPercentage: 21,
    category: "bags",
    brand: "Woman Style",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800"
    ],
    stockQuantity: 15,
    featured: true
  },
  // Another bag
  {
    name: "Mini Crossbody",
    description: "Compact crossbody bag for essentials on the go.",
    price: 700,
    originalPrice: 900,
    discountPercentage: 22,
    category: "bags",
    brand: "Woman Style",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=801"
    ],
    stockQuantity: 10,
    featured: false
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxury-ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Connected to MongoDB

    // Clear existing products
    await Product.deleteMany({});
    // Cleared existing products

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 