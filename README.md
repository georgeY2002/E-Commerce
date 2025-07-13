# Luxury E-Commerce Website

A high-end luxury e-commerce platform built with React frontend and Node.js backend, featuring a sophisticated dark design with luxury color palette and Inter font.

## Features

### Frontend
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Luxury UI/UX**: Dark theme with #1A1A1A and #77ACB7 color palette
- **Modern Animations**: Smooth transitions using Framer Motion
- **Product Browsing**: Grid layout with filtering and sorting
- **Shopping Cart**: Add/remove items, quantity management
- **Guest Checkout**: Streamlined checkout process
- **Admin Dashboard**: Earnings analytics, order management, inventory tracking

### Backend
- **RESTful API**: Express.js with MongoDB
- **Product Management**: CRUD operations for luxury products
- **Order Processing**: Complete order lifecycle management
- **Admin Authentication**: Secure JWT-based admin login
- **File Upload**: Image upload for products
- **Analytics**: Sales reports and earnings tracking

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Styled Components
- Framer Motion
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- Stripe (payment processing)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luxury-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/luxury-ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

4. **Database Setup**
   
   Start MongoDB and seed the database:
   ```bash
   cd backend
   npm run seed
   npm run create-admin
   ```

5. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (port 3000) and backend (port 5000) servers.

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin

### Admin Login

After running the setup, you can log in to the admin dashboard with:
- **Email**: admin@luxuryecommerce.com
- **Password**: admin123

## Project Structure

```
luxury-ecommerce/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── App.js          # Main app component
│   └── package.json
├── backend/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── models/             # MongoDB models
│   ├── uploads/            # File uploads
│   ├── server.js           # Express server
│   └── package.json
└── package.json            # Root package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard analytics
- `GET /api/admin/earnings` - Earnings breakdown
- `POST /api/admin/login` - Admin login

## Admin Access

To access the admin dashboard:
1. Navigate to `/admin`
2. Use the default admin credentials (created during setup)
3. Access analytics, manage orders, and view earnings

## Features in Detail

### Product Catalog
- Luxury watches, jewelry, bags, and accessories
- High-quality product images
- Detailed product specifications
- Category filtering and search functionality

### Shopping Experience
- Intuitive product browsing
- Add to cart functionality
- Quantity management
- Guest checkout process

### Admin Dashboard
- Real-time earnings analytics
- Order management and tracking
- Inventory monitoring
- Customer insights

## Styling

The application uses a sophisticated dark luxury theme:
- **Primary Background**: #1A1A1A
- **Accent Color**: #77ACB7
- **Font**: Inter (modern luxury typography)
- **Responsive Design**: Mobile-first approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details 