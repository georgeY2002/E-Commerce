import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiShoppingBag, FiPackage, FiDollarSign, FiArrowRight } from 'react-icons/fi';

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled(motion.div)`
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
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    border-color: rgba(119, 172, 183, 0.3);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #1A1A1A;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1;
`;

const StatLabel = styled.div`
  color: #77ACB7;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const StatDescription = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ActionCard = styled(motion(Link))`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
  text-decoration: none;
  color: inherit;
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
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    border-color: rgba(119, 172, 183, 0.3);
  }
`;

const ActionIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #1A1A1A;
`;

const ActionTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const ActionDescription = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #77ACB7;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  ${ActionCard}:hover & {
    color: #5a8a94;
  }
`;

const QuickStats = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const QuickStatsTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

const QuickStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const QuickStat = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(119, 172, 183, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const QuickStatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const QuickStatLabel = styled.div`
  color: #77ACB7;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LoadingState = styled.div`
  text-align: center;
  color: #77ACB7;
  font-size: 1.2rem;
  padding: 4rem 0;
`;

const ErrorState = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.2rem;
  padding: 4rem 0;
`;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/dashboard');
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Memoize expensive calculations
  const memoizedStats = useMemo(() => {
    if (!stats) return null;
    return {
      totalEarnings: stats.totalEarnings?.toLocaleString() || '0',
      totalOrders: stats.totalOrders || '0',
      completedOrders: stats.completedOrders || '0',
      pendingOrders: stats.pendingOrders || '0',
      monthlyEarnings: stats.monthlyEarnings?.toLocaleString() || '0',
      yearlyEarnings: stats.yearlyEarnings?.toLocaleString() || '0'
    };
  }, [stats]);

  if (loading) {
    return (
      <Wrapper>
        <Container>
          <LoadingState>Loading dashboard...</LoadingState>
        </Container>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Container>
          <ErrorState>{error}</ErrorState>
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
            Admin <span>Dashboard</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Manage your luxury e-commerce platform with comprehensive analytics and tools.
          </Subtitle>
        </Header>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <StatIcon>
              <FiDollarSign />
            </StatIcon>
            <StatValue>${memoizedStats?.totalEarnings || '0'}</StatValue>
            <StatLabel>Total Earnings</StatLabel>
            <StatDescription>Lifetime revenue from all completed orders</StatDescription>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <StatIcon>
              <FiShoppingBag />
            </StatIcon>
            <StatValue>{memoizedStats?.totalOrders || '0'}</StatValue>
            <StatLabel>Total Orders</StatLabel>
            <StatDescription>All orders placed on the platform</StatDescription>
          </StatCard>


        </StatsGrid>

        <ActionsGrid>
          <ActionCard
            to="/admin/orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <ActionIcon>
              <FiShoppingBag />
            </ActionIcon>
            <ActionTitle>Order Management</ActionTitle>
            <ActionDescription>
              View, track, and manage all customer orders. Update order status, 
              track shipments, and handle customer inquiries efficiently.
            </ActionDescription>
            <ActionButton>
              Manage Orders <FiArrowRight />
            </ActionButton>
          </ActionCard>

          <ActionCard
            to="/admin/products"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <ActionIcon>
              <FiPackage />
            </ActionIcon>
            <ActionTitle>Product Management</ActionTitle>
            <ActionDescription>
              Add, edit, and manage your product catalog. Update inventory, 
              pricing, and product information to keep your store current.
            </ActionDescription>
            <ActionButton>
              Manage Products <FiArrowRight />
            </ActionButton>
          </ActionCard>

          <ActionCard
            to="/admin/earnings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <ActionIcon>
              <FiTrendingUp />
            </ActionIcon>
            <ActionTitle>Earnings Analytics</ActionTitle>
            <ActionDescription>
              Detailed financial reports and analytics. Track revenue trends, 
              analyze sales performance, and monitor business growth.
            </ActionDescription>
            <ActionButton>
              View Analytics <FiArrowRight />
            </ActionButton>
          </ActionCard>
        </ActionsGrid>

        <QuickStats
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <QuickStatsTitle>Quick Statistics</QuickStatsTitle>
          <QuickStatsGrid>
            <QuickStat>
              <QuickStatValue>{memoizedStats?.completedOrders || '0'}</QuickStatValue>
              <QuickStatLabel>Completed Orders</QuickStatLabel>
            </QuickStat>
            <QuickStat>
              <QuickStatValue>{memoizedStats?.pendingOrders || '0'}</QuickStatValue>
              <QuickStatLabel>Pending Orders</QuickStatLabel>
            </QuickStat>
            <QuickStat>
              <QuickStatValue>${memoizedStats?.monthlyEarnings || '0'}</QuickStatValue>
              <QuickStatLabel>Monthly Earnings</QuickStatLabel>
            </QuickStat>
            <QuickStat>
              <QuickStatValue>${memoizedStats?.yearlyEarnings || '0'}</QuickStatValue>
              <QuickStatLabel>Yearly Earnings</QuickStatLabel>
            </QuickStat>
          </QuickStatsGrid>
        </QuickStats>
      </Container>
    </Wrapper>
  );
};

export default React.memo(AdminDashboard); 