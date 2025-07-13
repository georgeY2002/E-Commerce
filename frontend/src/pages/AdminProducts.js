import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiTrash2, FiSearch, FiFilter, FiEye, FiPlus, FiEdit, FiX, FiUpload } from 'react-icons/fi';
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

const categories = ['bags', 'shoes'];

// ProductModal component for add/edit
function ProductModal({ product, onClose, onSave }) {
  const isEdit = !!product;
  const [form, setForm] = useState(() =>
    product ? { ...product } : {
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      discountPercentage: '',
      category: 'shoes',
      brand: '',
      images: [],
      stockQuantity: '',
      featured: false,
      variants: []
    }
  );
  const [variantDraft, setVariantDraft] = useState({ color: '', images: [], sizes: [{ size: '', inStock: true }] });
  const [variantImages, setVariantImages] = useState([]);
  const [variantColor, setVariantColor] = useState('');
  const [variantSizes, setVariantSizes] = useState([{ size: '', inStock: true }]);
  const [error, setError] = useState('');
  const isShoes = form.category === 'shoes';

  // Handle input changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle images for bags
  const handleImagesChange = e => {
    setForm(f => ({ ...f, images: Array.from(e.target.files) }));
  };

  // Handle variant images
  const handleVariantImagesChange = e => {
    setVariantImages(Array.from(e.target.files));
  };

  // Handle adding a size to the variant
  const handleAddSize = () => {
    setVariantSizes(sizes => [...sizes, { size: '', inStock: true }]);
  };

  // Handle removing a size
  const handleRemoveSize = idx => {
    setVariantSizes(sizes => sizes.filter((_, i) => i !== idx));
  };

  // Handle variant size change
  const handleVariantSizeChange = (idx, field, value) => {
    setVariantSizes(sizes => sizes.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  // Add variant to form
  const handleAddVariant = () => {
    if (!variantColor || variantSizes.some(s => !s.size)) {
      setError('Please enter color and all sizes');
      return;
    }
    setForm(f => ({
      ...f,
      variants: [
        ...f.variants,
        {
          color: variantColor,
          images: variantImages.map(f => URL.createObjectURL(f)), // For preview only
          sizes: variantSizes
        }
      ]
    }));
    setVariantColor('');
    setVariantImages([]);
    setVariantSizes([{ size: '', inStock: true }]);
    setError('');
  };

  // Remove variant
  const handleRemoveVariant = idx => {
    setForm(f => ({ ...f, variants: f.variants.filter((_, i) => i !== idx) }));
  };

  // Handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    // TODO: Upload images to backend, send correct structure
    // For now, just call onSave and close
    onSave();
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#222', borderRadius: 16, padding: 24, minWidth: 320, maxWidth: 480, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', position: 'relative' }}>
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#77ACB7', fontSize: 24, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#77ACB7', marginBottom: 16 }}>{isEdit ? 'Edit' : 'Add'} Product</h2>
        <label>Name<input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 12 }} /></label>
        <label>Description<textarea name="description" value={form.description} onChange={handleChange} required style={{ width: '100%', marginBottom: 12 }} /></label>
        <label>Price<input name="price" type="number" value={form.price} onChange={handleChange} required style={{ width: '100%', marginBottom: 12 }} /></label>
        <label>Original Price<input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} style={{ width: '100%', marginBottom: 12 }} /></label>
        <label>Discount %<input name="discountPercentage" type="number" value={form.discountPercentage} onChange={handleChange} style={{ width: '100%', marginBottom: 12 }} /></label>
        <label>Category
          <select name="category" value={form.category} onChange={handleChange} style={{ width: '100%', marginBottom: 12 }}>
            <option value="shoes">Shoes</option>
            <option value="bags">Bags</option>
          </select>
        </label>
        <label>Brand<input name="brand" value={form.brand} onChange={handleChange} required style={{ width: '100%', marginBottom: 12 }} /></label>
        <label>Stock Quantity<input name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange} required style={{ width: '100%', marginBottom: 12 }} /></label>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} style={{ marginRight: 8 }} /> Featured
        </label>
        {isShoes ? (
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ color: '#77ACB7', fontSize: 18, marginBottom: 8 }}>Variants (Color, Images, Sizes)</h3>
            {form.variants.map((v, idx) => (
              <div key={idx} style={{ background: '#333', borderRadius: 8, padding: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff' }}>{v.color}</span>
                  <button type="button" onClick={() => handleRemoveVariant(idx)} style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: 18, cursor: 'pointer' }}>Remove</button>
                </div>
                <div style={{ display: 'flex', gap: 4, margin: '4px 0' }}>
                  {v.images && v.images.map((img, i) => <img key={i} src={img} alt="variant" style={{ width: 32, height: 32, borderRadius: 4 }} />)}
                </div>
                <div style={{ fontSize: 13, color: '#aaa' }}>Sizes: {v.sizes.map(s => `${s.size}${s.inStock ? '' : ' (Out)'}`).join(', ')}</div>
              </div>
            ))}
            <div style={{ background: '#292929', borderRadius: 8, padding: 8, marginTop: 8 }}>
              <input placeholder="Color" value={variantColor} onChange={e => setVariantColor(e.target.value)} style={{ width: '40%', marginRight: 8 }} />
              <input type="file" multiple onChange={handleVariantImagesChange} style={{ marginBottom: 8 }} />
              <div style={{ margin: '8px 0' }}>
                {variantSizes.map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                    <input placeholder="Size" value={s.size} onChange={e => handleVariantSizeChange(idx, 'size', e.target.value)} style={{ width: 60, marginRight: 8 }} />
                    <label style={{ color: '#fff', fontSize: 13 }}>
                      <input type="checkbox" checked={s.inStock} onChange={e => handleVariantSizeChange(idx, 'inStock', e.target.checked)} style={{ marginRight: 4 }} /> In Stock
                    </label>
                    <button type="button" onClick={() => handleRemoveSize(idx)} style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: 16, marginLeft: 8, cursor: 'pointer' }}>×</button>
                  </div>
                ))}
                <button type="button" onClick={handleAddSize} style={{ background: '#77ACB7', color: '#1A1A1A', border: 'none', borderRadius: 6, padding: '2px 10px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>+ Size</button>
              </div>
              <button type="button" onClick={handleAddVariant} style={{ background: '#77ACB7', color: '#1A1A1A', border: 'none', borderRadius: 6, padding: '4px 16px', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 4 }}>Add Variant</button>
              {error && <div style={{ color: '#ff6b6b', fontSize: 13, marginTop: 4 }}>{error}</div>}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 16 }}>
            <label>Images<input type="file" multiple onChange={handleImagesChange} style={{ width: '100%', marginBottom: 8 }} /></label>
          </div>
        )}
        <button type="submit" style={{ background: '#77ACB7', color: '#1A1A1A', border: 'none', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%' }}>{isEdit ? 'Save Changes' : 'Add Product'}</button>
      </form>
    </div>
  );
}

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Add/Edit Product Modal
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setEditProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setEditProduct(null);
    setShowModal(false);
  };

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
        // Notify user-facing products page to refresh
        window.dispatchEvent(new Event('adminProductChange'));
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
          <button onClick={() => handleOpenModal()} style={{marginBottom:'1.5rem',padding:'0.8rem 2rem',borderRadius:12,background:'#77ACB7',color:'#1A1A1A',fontWeight:600,border:'none',fontSize:'1.1rem',cursor:'pointer'}}>Add Product</button>
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
            <option value="bags">Bags</option>
            <option value="shoes">Shoes</option>
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
              <ProductPrice>EGP{product.price.toLocaleString()}</ProductPrice>
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

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={handleCloseModal}
          onSave={fetchProducts}
        />
      )}
    </Wrapper>
  );
};

export default AdminProducts; 