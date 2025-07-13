import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminEarnings from './pages/AdminEarnings';
import AdminProducts from './pages/AdminProducts';
import AdminRoute from './components/AdminRoute';
import './App.css';

// Memoized route components to prevent unnecessary re-renders
const MemoizedHome = memo(Home);
const MemoizedProducts = memo(Products);
const MemoizedProductDetail = memo(ProductDetail);
const MemoizedCart = memo(Cart);
const MemoizedCheckout = memo(Checkout);
const MemoizedAdminLogin = memo(AdminLogin);
const MemoizedAdminDashboard = memo(AdminDashboard);
const MemoizedAdminOrders = memo(AdminOrders);
const MemoizedAdminEarnings = memo(AdminEarnings);
const MemoizedAdminProducts = memo(AdminProducts);

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoizedHome />
            </motion.div>
          } />
          
          <Route path="/products" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoizedProducts />
            </motion.div>
          } />
          
          <Route path="/products/:id" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoizedProductDetail />
            </motion.div>
          } />
          
          <Route path="/cart" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoizedCart />
            </motion.div>
          } />
          
          <Route path="/checkout" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoizedCheckout />
            </motion.div>
          } />
          
          <Route path="/admin" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MemoizedAdminLogin />
            </motion.div>
          } />
          
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MemoizedAdminDashboard />
              </motion.div>
            </AdminRoute>
          } />
          
          <Route path="/admin/orders" element={
            <AdminRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MemoizedAdminOrders />
              </motion.div>
            </AdminRoute>
          } />
          
          <Route path="/admin/earnings" element={
            <AdminRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MemoizedAdminEarnings />
              </motion.div>
            </AdminRoute>
          } />
          
          <Route path="/admin/products" element={
            <AdminRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MemoizedAdminProducts />
              </motion.div>
            </AdminRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 