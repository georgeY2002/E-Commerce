import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiUser, FiCalendar, FiDollarSign, FiTruck, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import OrderCard from '../components/OrderCard';

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
  margin-bottom: 4rem;
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

const OrdersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

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
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 0.9rem;
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

const UpdateBtn = styled(motion.button)`
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(119, 172, 183, 0.3);
  }
  
  &:disabled {
    background: #555;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${props => {
    switch(props.status) {
      case 'completed': return 'linear-gradient(135deg, #4CAF50, #45a049)';
      case 'pending': return 'linear-gradient(135deg, #FF9800, #f57c00)';
      case 'processing': return 'linear-gradient(135deg, #2196F3, #1976D2)';
      case 'shipped': return 'linear-gradient(135deg, #9C27B0, #7B1FA2)';
      case 'cancelled': return 'linear-gradient(135deg, #F44336, #d32f2f)';
      case 'returned': return 'linear-gradient(135deg, #FF5722, #e64a19)';
      default: return 'linear-gradient(135deg, #666, #555)';
    }
  }};
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

const PaymentBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${props => {
    switch(props.status) {
      case 'completed': return 'linear-gradient(135deg, #4CAF50, #45a049)';
      case 'pending': return 'linear-gradient(135deg, #FF9800, #f57c00)';
      case 'failed': return 'linear-gradient(135deg, #F44336, #d32f2f)';
      default: return 'linear-gradient(135deg, #666, #555)';
    }
  }};
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  color: #77ACB7;
  font-size: 1.2rem;
  padding: 4rem 0;
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const LoadingState = styled.div`
  text-align: center;
  color: #77ACB7;
  font-size: 1.2rem;
  padding: 4rem 0;
`;

const FilterControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
  }
  
  option {
    background: #1A1A1A;
    color: #fff;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const PageBtn = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%)' : 'rgba(26, 26, 26, 0.8)'};
  color: white;
  border: 1px solid rgba(119, 172, 183, 0.3);
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(119, 172, 183, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(119, 172, 183, 0.1);
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #77ACB7;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(119, 172, 183, 0.1);
  }
`;

const OrderDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailSection = styled.div`
  background: rgba(26, 26, 26, 0.5);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const DetailTitle = styled.h4`
  color: #77ACB7;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(119, 172, 183, 0.1);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #ccc;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #fff;
  font-weight: 600;
`;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: ''
  });

  useEffect(() => {
    fetchOrders();
  }, [currentPage, filters]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filters.status && { status: filters.status }),
        ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus })
      });
      
      const response = await axios.get(`/api/admin/orders?${params}`);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters.status, filters.paymentStatus]);

  const handleStatusUpdate = useCallback(async (orderId, orderStatus, paymentStatus) => {
    setUpdating(prev => ({ ...prev, [orderId]: true }));
    try {
      await axios.patch(`/api/admin/orders/${orderId}/status`, {
        orderStatus,
        paymentStatus
      });
      toast.success('Order status updated successfully');
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  }, [fetchOrders]);

  const getStatusIcon = useCallback((status) => {
    switch(status) {
      case 'completed': return <FiCheck />;
      case 'pending': return <FiPackage />;
      default: return <FiPackage />;
    }
  }, []);

  const getPaymentIcon = useCallback((status) => {
    switch(status) {
      case 'completed': return <FiCheck />;
      case 'failed': return <FiX />;
      default: return <FiDollarSign />;
    }
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <Container>
          <LoadingState>Loading orders...</LoadingState>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Order <span>Management</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Track, manage, and update customer orders with real-time status updates.
          </Subtitle>
        </Header>

        <FilterControls>
          <FilterSelect
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Order Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </FilterSelect>

          <FilterSelect
            value={filters.paymentStatus}
            onChange={(e) => setFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
          >
            <option value="">All Payment Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </FilterSelect>
        </FilterControls>

        <OrdersGrid>
          {orders.length === 0 ? (
            <EmptyState
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              No orders found.
            </EmptyState>
          ) : (
            <AnimatePresence>
              {orders.map((order, index) => (
                <OrderCardContainer
                  key={order._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <OrderCard
                    order={order}
                    index={index}
                    updating={updating}
                    onStatusUpdate={handleStatusUpdate}
                    onViewDetails={(order) => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                    getStatusIcon={getStatusIcon}
                    getPaymentIcon={getPaymentIcon}
                  />
                </OrderCardContainer>
              ))}
            </AnimatePresence>
          )}
        </OrdersGrid>

        {totalPages > 1 && (
          <Pagination>
            <PageBtn
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </PageBtn>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PageBtn
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PageBtn>
            ))}
            
            <PageBtn
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </PageBtn>
          </Pagination>
        )}
      </Container>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowOrderDetails(false)}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseBtn onClick={() => setShowOrderDetails(false)}>×</CloseBtn>
            
            <h2 style={{ color: '#77ACB7', marginBottom: '1rem' }}>
              Order Details - #{selectedOrder._id.slice(-8).toUpperCase()}
            </h2>
            
            <OrderDetailsGrid>
              <DetailSection>
                <DetailTitle>Customer Information</DetailTitle>
                {selectedOrder.user ? (
                  <>
                    <DetailItem>
                      <DetailLabel>Name:</DetailLabel>
                      <DetailValue>{selectedOrder.user.name}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Email:</DetailLabel>
                      <DetailValue>{selectedOrder.user.email}</DetailValue>
                    </DetailItem>
                  </>
                ) : selectedOrder.guestInfo ? (
                  <>
                    <DetailItem>
                      <DetailLabel>Name:</DetailLabel>
                      <DetailValue>{selectedOrder.guestInfo.name}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Email:</DetailLabel>
                      <DetailValue>{selectedOrder.guestInfo.email}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Phone:</DetailLabel>
                      <DetailValue>{selectedOrder.guestInfo.phone}</DetailValue>
                    </DetailItem>
                  </>
                ) : (
                  <DetailItem>
                    <DetailLabel>Customer:</DetailLabel>
                    <DetailValue>Guest User</DetailValue>
                  </DetailItem>
                )}
              </DetailSection>

              <DetailSection>
                <DetailTitle>Order Information</DetailTitle>
                <DetailItem>
                  <DetailLabel>Order Date:</DetailLabel>
                  <DetailValue>
                    {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Order Status:</DetailLabel>
                  <DetailValue style={{ 
                    color: selectedOrder.orderStatus === 'completed' ? '#4CAF50' : 
                           selectedOrder.orderStatus === 'cancelled' ? '#f44336' : '#77ACB7'
                  }}>
                    {selectedOrder.orderStatus}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Payment Status:</DetailLabel>
                  <DetailValue style={{ 
                    color: selectedOrder.paymentStatus === 'completed' ? '#4CAF50' : 
                           selectedOrder.paymentStatus === 'failed' ? '#f44336' : '#77ACB7'
                  }}>
                    {selectedOrder.paymentStatus}
                  </DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Payment Method:</DetailLabel>
                  <DetailValue>{selectedOrder.paymentMethod}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Total Amount:</DetailLabel>
                  <DetailValue>${selectedOrder.totalAmount?.toLocaleString()}</DetailValue>
                </DetailItem>
              </DetailSection>

              <DetailSection>
                <DetailTitle>Shipping Address</DetailTitle>
                <DetailItem>
                  <DetailLabel>Street:</DetailLabel>
                  <DetailValue>{selectedOrder.shippingAddress?.street}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>City:</DetailLabel>
                  <DetailValue>{selectedOrder.shippingAddress?.city}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>State:</DetailLabel>
                  <DetailValue>{selectedOrder.shippingAddress?.state}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Zip Code:</DetailLabel>
                  <DetailValue>{selectedOrder.shippingAddress?.zipCode}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Country:</DetailLabel>
                  <DetailValue>{selectedOrder.shippingAddress?.country}</DetailValue>
                </DetailItem>
              </DetailSection>

              <DetailSection>
                <DetailTitle>Order Items</DetailTitle>
                {selectedOrder.items?.map((item, index) => (
                  <DetailItem key={index}>
                    <DetailLabel>{item.product?.name} (x{item.quantity})</DetailLabel>
                    <DetailValue>${(item.price * item.quantity).toLocaleString()}</DetailValue>
                  </DetailItem>
                ))}
              </DetailSection>
            </OrderDetailsGrid>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

export default React.memo(AdminOrders); 