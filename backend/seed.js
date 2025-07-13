const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const luxuryProducts = [
  {
    name: "Rolex Submariner",
    description: "Iconic luxury dive watch with automatic movement and 300m water resistance. Features a black dial with luminescent markers and a unidirectional rotating bezel.",
    price: 8500,
    category: "watches",
    brand: "Rolex",
    material: "Stainless Steel",
    dimensions: {
      length: 40,
      width: 40,
      height: 12
    },
    weight: 155,
    stockQuantity: 5,
    featured: true,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
    ]
  },
  {
    name: "Cartier Love Bracelet",
    description: "Timeless 18k yellow gold bracelet with screw motif design. A symbol of eternal love and commitment.",
    price: 6500,
    category: "jewelry",
    brand: "Cartier",
    material: "18k Yellow Gold",
    dimensions: {
      length: 6.5,
      width: 0.5,
      height: 0.5
    },
    weight: 30,
    stockQuantity: 8,
    featured: true,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
    ]
  },
  {
    name: "Hermès Birkin Bag",
    description: "Handcrafted luxury handbag in Togo leather with palladium hardware. Features spacious interior and iconic design.",
    price: 12000,
    category: "bags",
    brand: "Hermès",
    material: "Togo Leather",
    dimensions: {
      length: 30,
      width: 22,
      height: 16
    },
    weight: 1200,
    stockQuantity: 3,
    featured: true,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800"
    ]
  },
  {
    name: "Patek Philippe Calatrava",
    description: "Elegant dress watch with manual-winding movement. Features a clean white dial with gold hands and markers.",
    price: 25000,
    category: "watches",
    brand: "Patek Philippe",
    material: "18k White Gold",
    dimensions: {
      length: 39,
      width: 39,
      height: 9
    },
    weight: 120,
    stockQuantity: 2,
    featured: false,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
    ]
  },
  {
    name: "Tiffany & Co. Diamond Ring",
    description: "Classic solitaire diamond ring in platinum setting. Features a brilliant-cut diamond with excellent clarity.",
    price: 15000,
    category: "jewelry",
    brand: "Tiffany & Co.",
    material: "Platinum",
    dimensions: {
      length: 6.5,
      width: 0.3,
      height: 0.3
    },
    weight: 8,
    stockQuantity: 4,
    featured: true,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"
    ]
  },
  {
    name: "Chanel Classic Flap Bag",
    description: "Timeless quilted leather handbag with chain strap. Features the iconic CC logo and spacious interior.",
    price: 8800,
    category: "bags",
    brand: "Chanel",
    material: "Caviar Leather",
    dimensions: {
      length: 25,
      width: 16,
      height: 7
    },
    weight: 800,
    stockQuantity: 6,
    featured: false,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
    ]
  },
  {
    name: "Audemars Piguet Royal Oak",
    description: "Sporty luxury watch with distinctive octagonal bezel. Features automatic movement and integrated bracelet.",
    price: 35000,
    category: "watches",
    brand: "Audemars Piguet",
    material: "Stainless Steel",
    dimensions: {
      length: 41,
      width: 41,
      height: 10
    },
    weight: 180,
    stockQuantity: 3,
    featured: true,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800"
    ]
  },
  {
    name: "Van Cleef & Arpels Alhambra Necklace",
    description: "Iconic four-leaf clover motif necklace in 18k yellow gold. Features a delicate chain and timeless design.",
    price: 3200,
    category: "jewelry",
    brand: "Van Cleef & Arpels",
    material: "18k Yellow Gold",
    dimensions: {
      length: 16,
      width: 2,
      height: 0.5
    },
    weight: 15,
    stockQuantity: 10,
    featured: false,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"
    ]
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