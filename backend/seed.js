const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const luxuryProducts = [
  {
    name: "Rolex Submariner",
    description: "Iconic luxury dive watch with automatic movement and 300m water resistance. Features a black dial with luminescent markers and a unidirectional rotating bezel.",
    price: 8500,
    originalPrice: 10625,
    discountPercentage: 20,
    category: "watches",
    brand: "Rolex",
    material: "Stainless Steel",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
    ],
    stockQuantity: 5,
    featured: true
  },
  {
    name: "Cartier Love Bracelet",
    description: "Timeless 18k yellow gold bracelet with screw motif design. A symbol of eternal love and commitment.",
    price: 6500,
    originalPrice: 8125,
    discountPercentage: 20,
    category: "jewelry",
    brand: "Cartier",
    material: "18k Yellow Gold",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
    ],
    stockQuantity: 8,
    featured: true
  },
  {
    name: "Hermès Birkin Bag",
    description: "Handcrafted luxury handbag in Togo leather with palladium hardware. Features spacious interior and iconic design.",
    price: 12000,
    originalPrice: 15000,
    discountPercentage: 20,
    category: "bags",
    brand: "Hermès",
    material: "Togo Leather",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800"
    ],
    stockQuantity: 3,
    featured: true
  },
  {
    name: "Patek Philippe Calatrava",
    description: "Elegant dress watch with manual-winding movement. Features a clean white dial with gold hands and markers.",
    price: 25000,
    originalPrice: 31250,
    discountPercentage: 20,
    category: "watches",
    brand: "Patek Philippe",
    material: "18k White Gold",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
    ],
    stockQuantity: 2,
    featured: false
  },
  {
    name: "Tiffany & Co. Diamond Ring",
    description: "Classic solitaire diamond ring in platinum setting. Features a brilliant-cut diamond with excellent clarity.",
    price: 15000,
    originalPrice: 18750,
    discountPercentage: 20,
    category: "jewelry",
    brand: "Tiffany & Co.",
    material: "Platinum",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"
    ],
    stockQuantity: 4,
    featured: true
  },
  {
    name: "Chanel Classic Flap Bag",
    description: "Timeless quilted leather handbag with chain strap. Features the iconic CC logo and spacious interior.",
    price: 8800,
    originalPrice: 11000,
    discountPercentage: 20,
    category: "bags",
    brand: "Chanel",
    material: "Caviar Leather",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
    ],
    stockQuantity: 6,
    featured: false
  },
  {
    name: "Audemars Piguet Royal Oak",
    description: "Sporty luxury watch with distinctive octagonal bezel. Features automatic movement and integrated bracelet.",
    price: 35000,
    originalPrice: 43750,
    discountPercentage: 20,
    category: "watches",
    brand: "Audemars Piguet",
    material: "Stainless Steel",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
    ],
    stockQuantity: 3,
    featured: true
  },
  {
    name: "SHIEN",
    description: "old is gold",
    price: 250,
    originalPrice: 313,
    discountPercentage: 20,
    category: "watches",
    brand: "SHIEN",
    material: "Plastic",
    images: [
      "https://res.cloudinary.com/din7korba/image/upload/v1752416304/IMG_9815_xmz4bg.jpg"
    ],
    stockQuantity: 8,
    featured: false
  },
  {
    name: "Van Cleef & Arpels Alhambra Necklace",
    description: "Iconic four-leaf clover motif necklace in 18k yellow gold. Features a delicate chain and timeless design.",
    price: 3200,
    originalPrice: 4000,
    discountPercentage: 20,
    category: "jewelry",
    brand: "Van Cleef & Arpels",
    material: "18k Yellow Gold",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
    ],
    stockQuantity: 10,
    featured: false
  },
  {
    name: 'Discounted Dress',
    description: 'A beautiful dress with a special offer.',
    price: 800,
    originalPrice: 1000,
    discountPercentage: 20,
    category: 'clothing',
    brand: 'Woman Style',
    material: 'Cotton',
    images: ['https://res.cloudinary.com/demo/image/upload/v1680000000/dress1.jpg'],
    stockQuantity: 10,
    featured: true
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
    const insertedProducts = await Product.insertMany(luxuryProducts);
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