import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiMail, FiLock } from 'react-icons/fi';

const Wrapper = styled.section`
  background: #1A1A1A;
  min-height: 100vh;
  padding: 60px 0 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled(motion.form)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  color: #fff;
  padding: 3rem 2.5rem;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const Title = styled.h2`
  color: #77ACB7;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Subtitle = styled.p`
  color: #ccc;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  color: #77ACB7;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 12px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
    box-shadow: 0 0 0 3px rgba(119, 172, 183, 0.1);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #77ACB7;
  z-index: 1;
`;

const SubmitBtn = styled.button`
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(119, 172, 183, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await login(form.email, form.password);
    setLoading(false);
    if (res.success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <Wrapper>
      <Card
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          <FiShield />
          Admin Access
        </Title>
        <Subtitle>Enter your admin credentials to access the dashboard</Subtitle>
        
        <Field>
          <Label>Email</Label>
          <IconWrapper>
            <FiMail />
          </IconWrapper>
          <Input 
            name="email" 
            type="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="admin@example.com"
            required 
          />
        </Field>
        
        <Field>
          <Label>Password</Label>
          <IconWrapper>
            <FiLock />
          </IconWrapper>
          <Input 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange} 
            placeholder="Enter your password"
            required 
          />
        </Field>
        
        <SubmitBtn type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </SubmitBtn>
      </Card>
    </Wrapper>
  );
};

export default AdminLogin; 