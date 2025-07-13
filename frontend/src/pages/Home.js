import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiStar, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(119, 172, 183, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(119, 172, 183, 0.05) 0%, transparent 50%);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  line-height: 1.1;
  
  span {
    background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: #ccc;
  margin-bottom: 3rem;
  line-height: 1.6;
  font-weight: 300;
`;

const CTAButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  font-weight: 600;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  text-decoration: none;
  box-shadow: 0 8px 32px rgba(119, 172, 183, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(119, 172, 183, 0.4);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #77ACB7;
  border-radius: 50%;
  opacity: 0.6;
`;

const Section = styled.section`
  padding: 6rem 0;
  background: #1A1A1A;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #fff;
  text-align: center;
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

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #ccc;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ProductCard = styled(motion(Link))`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
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
    height: 2px;
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

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  color: #77ACB7;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ProductPrice = styled.div`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ProductBrand = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(119, 172, 183, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(119, 172, 183, 0.05) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  color: #1A1A1A;
`;

const FeatureTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const BrandMessage = styled(motion.div)`
  text-align: center;
  color: #fff;
  font-size: 1.3rem;
  margin-top: 6rem;
  padding: 3rem;
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  border: 1px solid rgba(119, 172, 183, 0.1);
  line-height: 1.8;
  
  p {
    margin-bottom: 1rem;
  }
  
  strong {
    color: #77ACB7;
    font-weight: 600;
  }
`;

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products?featured=true&limit=6')
      .then(res => setFeatured(res.data))
      .finally(() => setLoading(false));
  }, []);

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  return (
    <>
      <HeroSection>
        <HeroBackground />
        <FloatingElements>
          {floatingElements.map((element) => (
            <FloatingElement
              key={element.id}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
              }}
            />
          ))}
        </FloatingElements>
        
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Luxury <span>Redefined</span>
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Discover the world's most exclusive products, curated for those who demand the extraordinary. 
            Where elegance meets innovation, and every detail tells a story of excellence.
          </HeroSubtitle>
          <CTAButton
            to="/products"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Collection <FiArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured <span>Products</span>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Handpicked selections that embody sophistication and quality. Each piece is carefully chosen to elevate your lifestyle.
          </SectionSubtitle>
          
          <ProductsGrid
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {loading ? (
              <div style={{color:'#77ACB7',textAlign:'center',gridColumn:'1/-1'}}>Loading...</div>
            ) : featured.length === 0 ? (
              <div style={{color:'#77ACB7',textAlign:'center',gridColumn:'1/-1'}}>No featured products yet.</div>
            ) : featured.map((product, index) => (
              <ProductCard
                to={`/products/${product._id}`}
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProductImage src={product.images[0]} alt={product.name} />
                <ProductName>{product.name}</ProductName>
                <ProductPrice>EGP{product.price.toLocaleString()}</ProductPrice>
                <ProductBrand>{product.brand}</ProductBrand>
              </ProductCard>
            ))}
          </ProductsGrid>

          <FeaturesSection>
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <FeatureIcon>
                <FiStar />
              </FeatureIcon>
              <FeatureTitle>Premium Quality</FeatureTitle>
              <FeatureDescription>
                Every product is carefully selected to meet our exacting standards of quality and craftsmanship.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <FeatureIcon>
                <FiShoppingBag />
              </FeatureIcon>
              <FeatureTitle>Exclusive Collection</FeatureTitle>
              <FeatureDescription>
                Discover unique pieces that set you apart. Our curated collection represents the pinnacle of luxury.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <FeatureIcon>
                <FiTrendingUp />
              </FeatureIcon>
              <FeatureTitle>Investment Value</FeatureTitle>
              <FeatureDescription>
                Our products are not just purchases, but investments in quality that appreciate over time.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesSection>

          <BrandMessage
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>Welcome to <strong>LUXURY</strong>. Where elegance meets exclusivity.</p>
            <p>Shop the finest, live the best. Every moment is an opportunity to elevate your experience.</p>
          </BrandMessage>
        </Container>
      </Section>
    </>
  );
};

export default Home; 