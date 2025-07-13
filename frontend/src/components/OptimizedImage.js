import React, { useState } from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.loaded ? 1 : 0};
  transition: opacity 0.1s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  
  @media (max-width: 768px) {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #222 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.8rem;
  opacity: ${props => props.loaded ? 0 : 1};
  transition: opacity 0.1s ease;
`;

const OptimizedImage = ({ 
  src, 
  alt, 
  placeholder = "Loading...", 
  fallback = "/placeholder-image.jpg",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const imageSrc = hasError ? fallback : src;

  return (
    <ImageWrapper>
      <Placeholder loaded={isLoaded}>{placeholder}</Placeholder>
      <StyledImage
        src={imageSrc}
        alt={alt}
        loaded={isLoaded}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </ImageWrapper>
  );
};

export default OptimizedImage; 