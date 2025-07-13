import React from 'react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiArrowRight, FiShoppingBag, FiMinus, FiPlus, FiImage } from 'react-icons/fi';

const Wrapper = styled.section`
  background: #1A1A1A;
  min-height: 100vh;
  padding: 80px 0 40px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  
  span {
    background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const CartItems = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const CartSummary = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
  
  @media (max-width: 1024px) {
    position: static;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Item = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(145deg, #1a1a1a 0%, #191919 100%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.05);
  transition: all 0.15s ease;
  will-change: transform;
  
  &:hover {
    border-color: rgba(119, 172, 183, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  background: #111;
  flex-shrink: 0;
  border: 1px solid rgba(119, 172, 183, 0.2);
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
`;

const PlaceholderImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(145deg, #333 0%, #222 100%);
  flex-shrink: 0;
  border: 1px solid rgba(119, 172, 183, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #77ACB7;
  font-size: 1.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h3`
  color: #77ACB7;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ItemBrand = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(119, 172, 183, 0.1);
  border-radius: 25px;
  padding: 0.5rem;
  border: 1px solid rgba(119, 172, 183, 0.2);
`;

const QtyBtn = styled.button`
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(119, 172, 183, 0.3);
  }
  
  &:disabled {
    background: #555;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Quantity = styled.span`
  color: #fff;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

const RemoveBtn = styled.button`
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: rgba(255, 107, 107, 0.5);
    transform: scale(1.05);
  }
`;

const SummaryTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(119, 172, 183, 0.1);
  
  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 1.2rem;
    color: #77ACB7;
    margin-top: 1rem;
    padding-top: 1.5rem;
    border-top: 2px solid rgba(119, 172, 183, 0.2);
  }
`;

const SummaryLabel = styled.span`
  color: #ccc;
  font-size: 1rem;
`;

const SummaryValue = styled.span`
  color: #fff;
  font-weight: 600;
`;

const CheckoutBtn = styled(motion(Link))`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  font-weight: 600;
  padding: 1.2rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  text-decoration: none;
  box-shadow: 0 8px 32px rgba(119, 172, 183, 0.3);
  transition: all 0.3s ease;
  margin-top: 2rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(119, 172, 183, 0.4);
  }
`;

const EmptyCart = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: #77ACB7;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const ContinueShoppingBtn = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 8px 32px rgba(119, 172, 183, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(119, 172, 183, 0.4);
  }
`;

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your <span>Cart</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Review your selected items and proceed to checkout for a seamless luxury experience.
          </Subtitle>
        </Header>

        {cart.length === 0 ? (
          <EmptyCart
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EmptyIcon>
              <FiShoppingBag />
            </EmptyIcon>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyText>Discover our exclusive collection and add some luxury to your cart.</EmptyText>
            <ContinueShoppingBtn
              to="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping <FiArrowRight />
            </ContinueShoppingBtn>
          </EmptyCart>
        ) : (
          <CartLayout>
            <CartItems
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ItemList>
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <Item
                      key={item._id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.15, delay: Math.min(index * 0.01, 0.1) }}
                    >
                      <ItemImage src={item.images?.[0] || '/placeholder-image.jpg'} alt={item.name || 'Product'} />
                      <ItemInfo>
                        <ItemName>{item.name || 'Product Name'}</ItemName>
                        <ItemBrand>{item.brand || 'Brand'}</ItemBrand>
                        <ItemPrice>${(item.price || 0).toLocaleString()}</ItemPrice>
                      </ItemInfo>
                      <ItemControls>
                        <QuantityControl>
                          <QtyBtn
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus />
                          </QtyBtn>
                          <Quantity>{item.quantity}</Quantity>
                          <QtyBtn onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                            <FiPlus />
                          </QtyBtn>
                        </QuantityControl>
                        <RemoveBtn
                          onClick={() => removeFromCart(item._id)}
                          title="Remove item"
                        >
                          <FiTrash2 />
                        </RemoveBtn>
                      </ItemControls>
                    </Item>
                  ))}
                </AnimatePresence>
              </ItemList>
            </CartItems>

            <CartSummary
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SummaryTitle>Order Summary</SummaryTitle>
              <SummaryItem>
                <SummaryLabel>Subtotal</SummaryLabel>
                <SummaryValue>${getCartTotal().toLocaleString()}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Shipping</SummaryLabel>
                <SummaryValue>Free</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Tax</SummaryLabel>
                <SummaryValue>${(getCartTotal() * 0.08).toFixed(2)}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Total</SummaryLabel>
                <SummaryValue>${(getCartTotal() * 1.08).toLocaleString()}</SummaryValue>
              </SummaryItem>
              
              <CheckoutBtn
                to="/checkout"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout <FiArrowRight />
              </CheckoutBtn>
            </CartSummary>
          </CartLayout>
        )}
      </Container>
    </Wrapper>
  );
};

export default Cart; 