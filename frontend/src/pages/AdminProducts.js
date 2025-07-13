import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiTrash2, FiSearch, FiFilter, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Wrapper = styled.section`
  background: #1A1A1A;
  min-height: 100vh;
  padding: 60px 0 40px 0;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #77ACB7;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border-radius: 25px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  font-size: 1rem;
  width: 250px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #77ACB7;
    box-shadow: 0 0 0 3px rgba(119, 172, 183, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  color: #77ACB7;
  font-size: 1.1rem;
`;

const Select = styled.select`
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

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProductCard = styled(motion.div)`
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 1.5rem;
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
  height: 200px;
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
  margin-bottom: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(119, 172, 183, 0.3);
  background: ${props => {
    if (props.variant === 'delete') return 'rgba(255, 107, 107, 0.2)';
    return 'rgba(26, 26, 26, 0.8)';
  }};
  color: ${props => {
    if (props.variant === 'delete') return '#ff6b6b';
    return '#fff';
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => {
      if (props.variant === 'delete') return '#ff6b6b';
      return '#77ACB7';
    }};
    background: ${props => {
      if (props.variant === 'delete') return 'rgba(255, 107, 107, 0.3)';
      return 'rgba(119, 172, 183, 0.1)';
    }};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #77ACB7;
  font-size: 1.2rem;
  padding: 4rem 0;
`;

const categories = ['watches', 'jewelry', 'bags', 'accessories', 'clothing', 'shoes'];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      
      const response = await axios.get(`/api/admin/products?${params}`);
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/admin/products/${productId}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Product Management</Title>
        </Header>

        <Controls>
          <SearchBox>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search products..."
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
        </Controls>

        <ProductsGrid>
          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : products.length === 0 ? (
            <EmptyState>No products found.</EmptyState>
          ) : products.map((product, index) => (
            <ProductCard
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <ProductImage src={product.images[0]} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>${product.price.toLocaleString()}</ProductPrice>
              <ProductBrand>{product.brand}</ProductBrand>
              
              <ActionButtons>
                <ActionButton
                  onClick={() => handleDeleteProduct(product._id)}
                  variant="delete"
                  title="Delete Product"
                >
                  <FiTrash2 />
                </ActionButton>
              </ActionButtons>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </Wrapper>
  );
};

export default AdminProducts; 