import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';

const Wrapper = styled.section`
  background: #1A1A1A;
  min-height: 100vh;
  padding: 60px 0 40px 0;
`;
const Card = styled(motion.div)`
  background: #222;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  color: #fff;
  padding: 2.5rem 2rem;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;
const Title = styled.h2`
  color: #77ACB7;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;
const EarningsList = styled.div`
  margin-top: 2rem;
`;
const EarningsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #191919;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;
const DateLabel = styled.div`
  color: #77ACB7;
  font-weight: 600;
`;
const Amount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

const AdminEarnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/earnings?period=month')
      .then(res => setEarnings(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <Card
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Earnings Breakdown</Title>
        {loading ? (
          <div style={{color:'#77ACB7',textAlign:'center'}}>Loading...</div>
        ) : earnings.length === 0 ? (
          <div style={{color:'#77ACB7',textAlign:'center'}}>No earnings data.</div>
        ) : (
          <EarningsList>
            {earnings.map(e => (
              <EarningsItem key={e._id}>
                <DateLabel>{e._id}</DateLabel>
                <Amount>EGP{e.dailyEarnings.toLocaleString()} ({e.orderCount} orders)</Amount>
              </EarningsItem>
            ))}
          </EarningsList>
        )}
      </Card>
    </Wrapper>
  );
};

export default AdminEarnings; 