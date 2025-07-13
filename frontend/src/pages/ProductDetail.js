import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiTruck, FiShield, FiRefreshCw, FiEye, FiShare2 } from 'react-icons/fi';

const Wrapper = styled.section`
  background: linear-gradient(135deg, #1A1A1A 0%, #0f0f0f 100%);
  min-height: 100vh;
  padding: 80px 0 40px 0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #77ACB7;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  background: rgba(119, 172, 183, 0.1);
  border: 1px solid rgba(119, 172, 183, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(119, 172, 183, 0.2);
    transform: translateX(-5px);
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  background: #111;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  
  @media (max-width: 768px) {
    height: 300px;
    border-radius: 16px;
    margin-bottom: 1rem;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
  will-change: transform;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`;

const ThumbnailImage = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#77ACB7' : 'transparent'};
  transition: all 0.15s ease;
  background: #111;
  will-change: transform;
  
  &:hover {
    border-color: rgba(119, 172, 183, 0.5);
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    height: 60px;
    border-radius: 8px;
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  font-size: 1.1rem;
  will-change: transform;
  
  &:hover {
    background: #77ACB7;
    transform: scale(1.05);
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
  z-index: 10;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProductHeader = styled.div`
  border-bottom: 1px solid rgba(119, 172, 183, 0.2);
  padding-bottom: 2rem;
`;

const ProductName = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  color: #77ACB7;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const ProductBrand = styled.div`
  color: #aaa;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
`;

const Currency = styled.span`
  font-size: 1rem;
  color: #aaa;
  font-weight: 400;
`;

const ProductDescription = styled.div`
  color: #ccc;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ProductFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const FeatureTag = styled.span`
  background: rgba(119, 172, 183, 0.1);
  color: #77ACB7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(119, 172, 183, 0.2);
  font-weight: 500;
`;

const ProductActionsSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const AddToCartBtn = styled(motion.button)`
  flex: 1;
  min-width: 200px;
  background: linear-gradient(135deg, #77ACB7 0%, #5a8a94 100%);
  color: #1A1A1A;
  font-weight: 600;
  padding: 1.2rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 32px rgba(119, 172, 183, 0.3);
  
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

const WishlistBtn = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(119, 172, 183, 0.3);
  background: transparent;
  color: #77ACB7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    border-color: #77ACB7;
    background: rgba(119, 172, 183, 0.1);
    transform: scale(1.1);
  }
`;

const ProductDetails = styled.div`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(119, 172, 183, 0.1);
`;

const DetailsTitle = styled.h3`
  color: #77ACB7;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #ccc;
  
  .icon {
    color: #77ACB7;
    font-size: 1.2rem;
  }
  
  .label {
    font-weight: 500;
    color: #aaa;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .value {
    color: #fff;
    font-weight: 600;
  }
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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <Container>
          <LoadingState>Loading product details...</LoadingState>
        </Container>
      </Wrapper>
    );
  }

  if (error || !product) {
    return (
      <Wrapper>
        <Container>
          <ErrorState>{error || 'Product not found'}</ErrorState>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <BackButton
          to="/products"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to Products
        </BackButton>

        <ProductLayout>
          <ImageSection>
            <MainImageContainer>
              <MainImage 
                src={product.images?.[selectedImage] || '/placeholder-image.jpg'} 
                alt={product.name} 
              />
              <ProductActions>
                <ActionButton title="Quick View">
                  <FiEye />
                </ActionButton>
                <ActionButton title="Share">
                  <FiShare2 />
                </ActionButton>
              </ProductActions>
              <ProductBadge>
                {product.category}
              </ProductBadge>
            </MainImageContainer>

            {product.images && product.images.length > 1 && (
              <ImageGallery>
                {product.images.map((image, index) => (
                  <ThumbnailImage
                    key={index}
                    active={index === selectedImage}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} - ${index + 1}`} />
                  </ThumbnailImage>
                ))}
              </ImageGallery>
            )}
          </ImageSection>

          <ProductInfo>
            <ProductHeader>
              <ProductName>{product.name}</ProductName>
              <ProductBrand>{product.brand}</ProductBrand>
              <div style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1rem' }}>Material: {product.material}</div>
              <ProductPrice>
                {product.originalPrice && product.discountPercentage ? (
                  <>
                    <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '1.3rem', marginRight: 12 }}>
                      EGP{product.originalPrice.toLocaleString()}
                    </span>
                    <CurrentPrice>
                      EGP{product.price.toLocaleString()}
                    </CurrentPrice>
                    <span style={{ color: '#ff6b6b', fontWeight: 600, fontSize: '1.1rem', marginLeft: 8 }}>
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                ) : (
                  <CurrentPrice>
                    EGP{product.price?.toLocaleString() || '0'}
                  </CurrentPrice>
                )}
              </ProductPrice>

              <ProductDescription>
                {product.description}
              </ProductDescription>

              {/* Removed ProductFeatures with feature tags */}
            </ProductHeader>

            <ProductActionsSection>
              <AddToCartBtn
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiShoppingCart />
                Add to Cart
              </AddToCartBtn>
            </ProductActionsSection>

            <ProductDetails>
              <DetailsTitle>Product Details</DetailsTitle>
              <DetailsGrid>
                <DetailItem>
                  <div className="icon"><FiTruck /></div>
                  <div>
                    <div className="label">Shipping</div>
                    <div className="value">Cairo</div>
                  </div>
                </DetailItem>
                <DetailItem>
                  <div className="icon"><FiEye /></div>
                  <div>
                    <div className="label">Category</div>
                    <div className="value">{product.category}</div>
                  </div>
                </DetailItem>
              </DetailsGrid>
            </ProductDetails>
          </ProductInfo>
        </ProductLayout>
      </Container>
    </Wrapper>
  );
};

export default ProductDetail; 