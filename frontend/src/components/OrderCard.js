import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiUser, FiDollarSign, FiCheck, FiX, FiTruck } from 'react-icons/fi';

const OrderCardContainer = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #77ACB7, #5a8a94);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.15);
    border-color: rgba(119, 172, 183, 0.2);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderId = styled.div`
  color: #77ACB7;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderDate = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderTotal = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderUser = styled.div`
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderItems = styled.div`
  margin: 1.5rem 0;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(119, 172, 183, 0.05);
  border-radius: 12px;
  margin-bottom: 0.8rem;
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
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

const StatusSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const StatusGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
`;

const StatusLabel = styled.label`
  color: #77ACB7;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatusSelect = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  option {
    background: #1A1A1A;
    color: #fff;
  }
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(76, 175, 80, 0.2)';
      case 'pending': return 'rgba(255, 152, 0, 0.2)';
      default: return 'rgba(119, 172, 183, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#4CAF50';
      case 'pending': return '#FF9800';
      default: return '#77ACB7';
    }
  }};
  border: 1px solid ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(76, 175, 80, 0.3)';
      case 'pending': return 'rgba(255, 152, 0, 0.3)';
      default: return 'rgba(119, 172, 183, 0.2)';
    }
  }};
`;

const PaymentBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(76, 175, 80, 0.2)';
      case 'failed': return 'rgba(244, 67, 54, 0.2)';
      default: return 'rgba(119, 172, 183, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#4CAF50';
      case 'failed': return '#f44336';
      default: return '#77ACB7';
    }
  }};
  border: 1px solid ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(76, 175, 80, 0.3)';
      case 'failed': return 'rgba(244, 67, 54, 0.3)';
      default: return 'rgba(119, 172, 183, 0.2)';
    }
  }};
`;

const UpdateBtn = styled(motion.button)`
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(119, 172, 183, 0.3);
  }
`;

const ViewDetailsBtn = styled.button`
  background: rgba(119, 172, 183, 0.1);
  color: #77ACB7;
  border: 1px solid rgba(119, 172, 183, 0.3);
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: rgba(119, 172, 183, 0.2);
    transform: translateY(-2px);
  }
`;

const OrderCard = memo(({ 
  order, 
  index, 
  updating, 
  onStatusUpdate, 
  onViewDetails, 
  getStatusIcon, 
  getPaymentIcon 
}) => {
  return (
    <OrderCardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <OrderHeader>
        <OrderInfo>
          <OrderId>
            <FiPackage />
            Order #{order._id.slice(-8).toUpperCase()}
          </OrderId>
          <OrderDate>
            <FiCalendar />
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </OrderDate>
          {order.user && (
            <OrderUser>
              <FiUser />
              {order.user.name} ({order.user.email})
            </OrderUser>
          )}
        </OrderInfo>
        <OrderTotal>
          <FiDollarSign />
          ${order.totalAmount?.toLocaleString() || '0'}
        </OrderTotal>
      </OrderHeader>

      <OrderItems>
        {order.items?.map((item, itemIndex) => (
          <OrderItem key={itemIndex}>
            <ItemImage src={item.product?.images?.[0]} alt={item.product?.name} />
            <ItemInfo>
              <ItemName>{item.product?.name}</ItemName>
              <ItemDetails>Qty: {item.quantity} • {item.product?.brand}</ItemDetails>
            </ItemInfo>
            <ItemPrice>EGP{item.price?.toLocaleString()}</ItemPrice>
          </OrderItem>
        ))}
      </OrderItems>

      <StatusSection>
        <StatusGroup>
          <StatusLabel>Order Status</StatusLabel>
          <StatusSelect
            value={order.orderStatus || 'pending'}
            onChange={(e) => onStatusUpdate(order._id, e.target.value, order.paymentStatus)}
            disabled={updating[order._id]}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </StatusSelect>
        </StatusGroup>

        <StatusGroup>
          <StatusLabel>Payment Status</StatusLabel>
          <StatusSelect
            value={order.paymentStatus || 'pending'}
            onChange={(e) => onStatusUpdate(order._id, order.orderStatus, e.target.value)}
            disabled={updating[order._id]}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </StatusSelect>
        </StatusGroup>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <StatusBadge status={order.orderStatus}>
            {getStatusIcon(order.orderStatus)}
            {order.orderStatus || 'pending'}
          </StatusBadge>
          <PaymentBadge status={order.paymentStatus}>
            {getPaymentIcon(order.paymentStatus)}
            {order.paymentStatus || 'pending'}
          </PaymentBadge>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <UpdateBtn
            onClick={() => onStatusUpdate(order._id, order.orderStatus, order.paymentStatus)}
            disabled={updating[order._id]}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {updating[order._id] ? 'Updating...' : 'Update Status'}
          </UpdateBtn>
          
          <ViewDetailsBtn onClick={() => onViewDetails(order)}>
            View Details
          </ViewDetailsBtn>
        </div>
      </StatusSection>
    </OrderCardContainer>
  );
});

OrderCard.displayName = 'OrderCard';

export default OrderCard; 