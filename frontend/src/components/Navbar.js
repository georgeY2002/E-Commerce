import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarContainer = styled.nav`
  width: 100%;
  background: #1A1A1A;
  color: #77ACB7;
  font-family: 'Inter', 'Poppins', 'Whyte', sans-serif;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
`;
const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  color: #77ACB7;
  text-decoration: none;
  letter-spacing: 2px;
`;
const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  @media (max-width: 768px) {
    display: none;
  }
`;
const NavLink = styled(Link)`
  color: #77ACB7;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
`;
const CartIcon = styled.div`
  position: relative;
  cursor: pointer;
  color: #77ACB7;
  font-size: 1.5rem;
`;
const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  background: #77ACB7;
  color: #1A1A1A;
  border-radius: 50%;
  font-size: 0.8rem;
  padding: 2px 7px;
  font-weight: 600;
`;
const MobileMenuIcon = styled.div`
  display: none;
  color: #77ACB7;
  font-size: 2rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;
const MobileMenu = styled(motion.ul)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70vw;
  height: 100vh;
  background: #1A1A1A;
  box-shadow: -2px 0 16px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem 2rem 2rem 2rem;
  z-index: 200;
`;

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ];

  return (
    <NavbarContainer>
      <NavInner>
        <Logo to="/">Woman Style</Logo>
        <NavLinks>
          {navLinks.map(link => (
            <li key={link.to}><NavLink to={link.to}>{link.label}</NavLink></li>
          ))}
          <li>
            <NavLink to="/cart">
              <CartIcon>
                <FiShoppingCart />
                {getCartCount() > 0 && <CartCount>{getCartCount()}</CartCount>}
              </CartIcon>
            </NavLink>
          </li>
          {user && isAdmin() && (
            <>
              <NavLink to="/admin/dashboard">Admin</NavLink>
              <NavLink to="/admin/products">Products</NavLink>
              <NavLink as="button" onClick={handleLogout} style={{background:'none',border:'none',cursor:'pointer'}}>Logout</NavLink>
            </>
          )}
        </NavLinks>
        <MobileMenuIcon onClick={() => setMenuOpen(true)}>
          <FiMenu />
        </MobileMenuIcon>
        <AnimatePresence>
          {menuOpen && (
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <li style={{alignSelf:'flex-end'}}>
                <FiX size={28} style={{cursor:'pointer'}} onClick={() => setMenuOpen(false)} />
              </li>
              {navLinks.map(link => (
                <li key={link.to}><NavLink to={link.to} onClick={()=>setMenuOpen(false)}>{link.label}</NavLink></li>
              ))}
              <li>
                <NavLink to="/cart" onClick={()=>setMenuOpen(false)}>
                  <CartIcon>
                    <FiShoppingCart />
                    {getCartCount() > 0 && <CartCount>{getCartCount()}</CartCount>}
                  </CartIcon>
                </NavLink>
              </li>
              {user && isAdmin() && (
                <>
                  <NavLink to="/admin/dashboard" onClick={()=>setMenuOpen(false)}>Admin</NavLink>
                  <NavLink to="/admin/products" onClick={()=>setMenuOpen(false)}>Products</NavLink>
                  <NavLink as="button" onClick={()=>{handleLogout();setMenuOpen(false);}} style={{background:'none',border:'none',cursor:'pointer'}}>Logout</NavLink>
                </>
              )}
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavInner>
    </NavbarContainer>
  );
};

export default Navbar; 