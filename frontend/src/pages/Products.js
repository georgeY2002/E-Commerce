import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiFilter, FiGrid, FiList, FiSearch, FiShoppingCart, FiEye } from 'react-icons/fi';

const Section = styled.section`
  background: linear-gradient(135deg, #1A1A1A 0%, #0f0f0f 100%);
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
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
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
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 6vw, 2.5rem);
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const StatsBar = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 2rem;
    border-radius: 12px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  color: #77ACB7;
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.2rem;
  }
  
  .label {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  @media (max-width: 768px) {
    .value {
      font-size: 1.2rem;
    }
    
    .label {
      font-size: 0.8rem;
    }
  }
`;

const Controls = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem;
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 25px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 1rem;
  width: 300px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
    box-shadow: 0 0 0 3px rgba(119, 172, 183, 0.1);
    background: rgba(26, 26, 26, 0.9);
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
    font-size: 0.9rem;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  color: #77ACB7;
  font-size: 1.2rem;
`;

const Select = styled.select`
  padding: 1rem 1.5rem;
  border-radius: 25px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
    box-shadow: 0 0 0 3px rgba(119, 172, 183, 0.1);
  }
  
  option {
    background: #1A1A1A;
    color: #fff;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    min-width: auto;
  }
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ProductCard = styled(motion(Link))`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;
  display: block;
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #77ACB7, #5a8a94);
    transform: scaleX(0);
    transition: transform 0.15s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    border-color: rgba(119, 172, 183, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
    transition: none;
    
    &:hover {
      transform: none;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    
    &::before {
      transition: none;
    }
    
    &:hover::before {
      transform: none;
    }
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: #111;
  
  @media (max-width: 768px) {
    height: 200px;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.15s ease;
  will-change: transform;
  
  ${ProductCard}:hover & {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    transition: none;
    
    ${ProductCard}:hover & {
      transform: none;
    }
  }
`;

const ProductActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.2s ease;
  
  ${ProductCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: #77ACB7;
    transform: scale(1.1);
  }
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ProductName = styled.h3`
  font-size: 1.4rem;
  color: #77ACB7;
  margin-bottom: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`;

const ProductPrice = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
`;

const ProductBrand = styled.div`
  color: #aaa;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

const ProductDescription = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: ${props => props.view === 'list' ? 'block' : 'none'};
`;

const ProductCategory = styled.div`
  color: #77ACB7;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
  }
`;

const ProductFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FeatureTag = styled.span`
  background: rgba(119, 172, 183, 0.1);
  color: #77ACB7;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(119, 172, 183, 0.2);
`;

const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
`;

const CarouselImage = styled.img`
  min-width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: none;
  color: #fff;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(119, 172, 183, 0.9);
    transform: translateY(-50%) scale(1.1);
  }
  
  ${props => props.direction === 'left' ? 'left: 15px;' : 'right: 15px;'}
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#77ACB7' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #77ACB7;
    transform: scale(1.2);
  }
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

const categories = ['watches', 'jewelry', 'bags', 'accessories', 'clothing', 'shoes'];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [carouselStates, setCarouselStates] = useState({});

  useEffect(() => {
    fetchProducts();
    // Listen for admin product changes
    const handleAdminProductChange = () => {
      fetchProducts();
    };
    window.addEventListener('adminProductChange', handleAdminProductChange);
    return () => {
      window.removeEventListener('adminProductChange', handleAdminProductChange);
    };
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, category, sort, search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort) {
      filtered.sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'name-asc') return a.name.localeCompare(b.name);
        if (sort === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleCarouselChange = (productId, direction) => {
    setCarouselStates(prev => {
      const currentIndex = prev[productId] || 0;
      const product = products.find(p => p._id === productId);
      const maxIndex = (product?.images?.length || 1) - 1;
      
      let newIndex;
      if (direction === 'next') {
        newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      }
      
      return { ...prev, [productId]: newIndex };
    });
  };

  const handleDotClick = (productId, index) => {
    setCarouselStates(prev => ({ ...prev, [productId]: index }));
  };

  return (
    <Section>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Luxury <span>Collection</span>
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our curated selection of premium products, each piece crafted with excellence and designed for those who appreciate the finest things in life.
          </Subtitle>
        </Header>

        <StatsBar
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <StatItem>
            <div className="value">{filteredProducts.length}</div>
            <div className="label">Products</div>
          </StatItem>
          <StatItem>
            <div className="value">Premium</div>
            <div className="label">Quality</div>
          </StatItem>
          <StatItem>
            <div className="value">24/7</div>
            <div className="label">Support</div>
          </StatItem>
        </StatsBar>

        <Controls
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FilterSection>
            <SearchBox>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search luxury products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>
            
            <Select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </Select>
            
            <Select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </Select>
          </FilterSection>
        </Controls>

        <ProductsGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            <LoadingState>Loading luxury products...</LoadingState>
          ) : filteredProducts.length === 0 ? (
            <EmptyState>No products found matching your criteria.</EmptyState>
          ) : filteredProducts.map((product, index) => (
            <ProductCard
              to={`/products/${product._id}`}
              key={product._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.2) }}
            >
              <ProductImageContainer>
                {product.images?.length > 1 ? (
                  <ImageCarousel>
                    <CarouselContainer
                      style={{
                        transform: `translateX(-${(carouselStates[product._id] || 0) * 100}%)`
                      }}
                    >
                      {product.images.map((image, imgIndex) => (
                        <CarouselImage
                          key={imgIndex}
                          src={image}
                          alt={`${product.name} - Image ${imgIndex + 1}`}
                        />
                      ))}
                    </CarouselContainer>
                    
                    <CarouselButton
                      direction="left"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCarouselChange(product._id, 'prev');
                      }}
                    >
                      <FiArrowLeft />
                    </CarouselButton>
                    
                    <CarouselButton
                      direction="right"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCarouselChange(product._id, 'next');
                      }}
                    >
                      <FiArrowRight />
                    </CarouselButton>
                    
                    <CarouselDots>
                      {product.images.map((_, imgIndex) => (
                        <Dot
                          key={imgIndex}
                          active={imgIndex === (carouselStates[product._id] || 0)}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDotClick(product._id, imgIndex);
                          }}
                        />
                      ))}
                    </CarouselDots>
                  </ImageCarousel>
                ) : (
                  <ProductImage src={product.images?.[0] || '/placeholder-image.jpg'} alt={product.name} />
                )}
                
                <ProductActions>
                  <ActionButton title="Quick View">
                    <FiEye />
                  </ActionButton>
                  <ActionButton title="Add to Cart">
                    <FiShoppingCart />
                  </ActionButton>
                </ProductActions>
                
                <ProductBadge>
                  {product.category}
                </ProductBadge>
              </ProductImageContainer>
              
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  {product.originalPrice && product.discountPercentage ? (
                    <>
                      <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '1.1rem', marginRight: 8 }}>
                        EGP{product.originalPrice.toLocaleString()}
                      </span>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', marginRight: 8 }}>
                        EGP{product.price.toLocaleString()}
                      </span>
                      <span style={{ color: '#ff6b6b', fontWeight: 600, fontSize: '1rem' }}>
                        {product.discountPercentage}% OFF
                      </span>
                    </>
                  ) : (
                    <>
                      EGP{product.price?.toLocaleString() || '0'}
                    </>
                  )}
                </ProductPrice>
                <ProductBrand>{product.brand}</ProductBrand>
                <div style={{ color: '#aaa', fontSize: '1rem', marginBottom: '0.5rem' }}>Material: {product.material}</div>
                {/* Removed ProductFeatures with feature tags */}
                <ProductCategory>{product.category}</ProductCategory>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </Section>
  );
};

export default Products; 