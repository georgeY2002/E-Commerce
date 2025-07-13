#!/bin/bash

echo "🚀 Setting up Luxury E-Commerce Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB first."
    echo "   You can download it from: https://www.mongodb.com/try/download/community"
    exit 1
fi

echo "📦 Installing dependencies..."
npm run install-all

echo "🔧 Setting up environment..."
cd backend
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi
cd ..

echo "🗄️  Setting up database..."
cd backend
echo "   Seeding products..."
npm run seed
echo "   Creating admin user..."
npm run create-admin
cd ..

echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start MongoDB (if not already running)"
echo "2. Run 'npm run dev' to start the development servers"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Access admin dashboard at http://localhost:3000/admin"
echo "   - Email: admin@luxuryecommerce.com"
echo "   - Password: admin123"
echo ""
echo "✨ Enjoy your luxury e-commerce website!" 