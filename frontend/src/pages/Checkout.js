import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCreditCard, FiUser, FiMapPin, FiLock, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Wrapper = styled.section`
  background: #1A1A1A;
  min-height: 100vh;
  padding: 80px 0 40px 0;
`;

const Container = styled.div`
  max-width: 1400px;
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

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CheckoutForm = styled(motion.form)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const OrderSummary = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
  
  @media (max-width: 1024px) {
    position: static;
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  color: #77ACB7;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(119, 172, 183, 0.2);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
    box-shadow: 0 0 0 3px rgba(119, 172, 183, 0.1);
    background: rgba(26, 26, 26, 0.9);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(119, 172, 183, 0.2);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
    box-shadow: 0 0 0 3px rgba(119, 172, 183, 0.1);
  }
  
  option {
    background: #1A1A1A;
    color: #fff;
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(119, 172, 183, 0.2);
  background: rgba(26, 26, 26, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  user-select: none;
  
  &:hover {
    border-color: rgba(119, 172, 183, 0.4);
    background: rgba(26, 26, 26, 0.9);
  }

  input[type="radio"] {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
    z-index: 2;
  }

  /* Optional: add a custom indicator for checked state */
  &.checked {
    border-color: #77ACB7;
    background: rgba(119, 172, 183, 0.1);
  }
`;

const PaymentIcon = styled.div`
  color: #77ACB7;
  font-size: 1.2rem;
`;

const PaymentText = styled.div`
  color: #fff;
  font-weight: 500;
`;

const SummaryTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OrderItems = styled.div`
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(119, 172, 183, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  background: #111;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  color: #77ACB7;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

const ItemDetails = styled.div`
  color: #aaa;
  font-size: 0.8rem;
`;

const ItemPrice = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const SummaryBreakdown = styled.div`
  margin-bottom: 2rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
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
  font-size: 0.9rem;
`;

const SummaryValue = styled.span`
  color: #fff;
  font-weight: 600;
`;

const SubmitBtn = styled(motion.button)`
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
  border: none;
  box-shadow: 0 8px 32px rgba(119, 172, 183, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  margin-top: 2rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(119, 172, 183, 0.4);
  }
  
  &:disabled {
    background: #555;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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
`;

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '', 
    email: user?.email || '', 
    phone: '',
    street: '', 
    city: '', 
    state: '', 
    zipCode: '', 
    country: '', 
    paymentMethod: 'visa'
  });
  const [loading, setLoading] = useState(false);

  if (!cart.length) {
    return (
      <Wrapper>
        <Container>
          <EmptyCart
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EmptyIcon>
              <FiShoppingBag />
            </EmptyIcon>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyText>Add some items to your cart before proceeding to checkout.</EmptyText>
          </EmptyCart>
        </Container>
      </Wrapper>
    );
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const orderData = {
        items: cart.map(item => ({ productId: item._id, quantity: item.quantity })),
        shippingAddress: {
          street: form.street,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country
        },
        billingAddress: {
          street: form.street,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country
        },
        paymentMethod: form.paymentMethod
      };

      // Add user ID if logged in, otherwise add guest info
      if (isAuthenticated() && user) {
        orderData.userId = user.id;
      } else {
        orderData.guestInfo = {
          name: form.name,
          email: form.email,
          phone: form.phone
        };
      }

      const response = await axios.post('/api/orders', orderData);
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Checkout failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Complete <span>Checkout</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Finalize your purchase with our secure checkout process.
          </Subtitle>
        </Header>

        <CheckoutLayout>
          <CheckoutForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Section>
              <SectionTitle>
                <FiUser /> Personal Information
              </SectionTitle>
              <FormGrid>
                <Field>
                  <Label>Full Name</Label>
                  <Input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Enter your full name"
                    required 
                  />
                </Field>
                <Field>
                  <Label>Email Address</Label>
                  <Input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email"
                    required 
                  />
                </Field>
              </FormGrid>
              <Field>
                <Label>Phone Number</Label>
                <Input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  placeholder="Enter your phone number"
                  required 
                />
              </Field>
            </Section>

            <Section>
              <SectionTitle>
                <FiMapPin /> Shipping Address
              </SectionTitle>
              <Field>
                <Label>Street Address</Label>
                <Input 
                  name="street" 
                  value={form.street} 
                  onChange={handleChange} 
                  placeholder="Enter your street address"
                  required 
                />
              </Field>
              <FormGrid>
                <Field>
                  <Label>City</Label>
                  <Input 
                    name="city" 
                    value={form.city} 
                    onChange={handleChange} 
                    placeholder="Enter your city"
                    required 
                  />
                </Field>
                <Field>
                  <Label>State/Province</Label>
                  <Input 
                    name="state" 
                    value={form.state} 
                    onChange={handleChange} 
                    placeholder="Enter your state"
                    required 
                  />
                </Field>
              </FormGrid>
              <FormGrid>
                <Field>
                  <Label>Zip/Postal Code</Label>
                  <Input 
                    name="zipCode" 
                    value={form.zipCode} 
                    onChange={handleChange} 
                    placeholder="Enter zip code"
                    required 
                  />
                </Field>
                <Field>
                  <Label>Country</Label>
                  <Input 
                    name="country" 
                    value={form.country} 
                    onChange={handleChange} 
                    placeholder="Enter your country"
                    required 
                  />
                </Field>
              </FormGrid>
            </Section>

            <Section>
              <SectionTitle>
                <FiCreditCard /> Payment Method
              </SectionTitle>
              <PaymentMethod>
                <PaymentOption className={form.paymentMethod === 'visa' ? 'checked' : ''}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="visa"
                    checked={form.paymentMethod === 'visa'}
                    onChange={handleChange}
                  />
                  <PaymentIcon><FiCreditCard /></PaymentIcon>
                  <PaymentText>Visa</PaymentText>
                </PaymentOption>
                <PaymentOption className={form.paymentMethod === 'cash_on_delivery' ? 'checked' : ''}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={form.paymentMethod === 'cash_on_delivery'}
                    onChange={handleChange}
                  />
                  <PaymentIcon><FiLock /></PaymentIcon>
                  <PaymentText>Cash on Delivery</PaymentText>
                </PaymentOption>
              </PaymentMethod>
            </Section>

            <SubmitBtn 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Processing...' : 'Complete Order'} <FiArrowRight />
            </SubmitBtn>
          </CheckoutForm>

          <OrderSummary
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <OrderItems>
              {cart.map(item => (
                <OrderItem key={item._id}>
                  <ItemImage src={item.images[0]} alt={item.name} />
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemDetails>Qty: {item.quantity} • {item.brand}</ItemDetails>
                  </ItemInfo>
                  <ItemPrice>${(item.price * item.quantity).toLocaleString()}</ItemPrice>
                </OrderItem>
              ))}
            </OrderItems>

            <SummaryBreakdown>
              <SummaryRow>
                <SummaryLabel>Subtotal</SummaryLabel>
                <SummaryValue>${subtotal.toLocaleString()}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Shipping</SummaryLabel>
                <SummaryValue>Free</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Tax (8%)</SummaryLabel>
                <SummaryValue>${tax.toFixed(2)}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Total</SummaryLabel>
                <SummaryValue>${total.toLocaleString()}</SummaryValue>
              </SummaryRow>
            </SummaryBreakdown>
          </OrderSummary>
        </CheckoutLayout>
      </Container>
    </Wrapper>
  );
};

export default Checkout; 