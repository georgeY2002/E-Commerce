import React from 'react';
import styled from 'styled-components';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: #1A1A1A;
  color: #77ACB7;
  padding: 2rem 0 1rem 0;
  text-align: center;
  font-family: 'Inter', 'Poppins', 'Whyte', sans-serif;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
`;
const Socials = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;
const SocialIcon = styled.a`
  color: #77ACB7;
  font-size: 1.5rem;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
`;
const Copy = styled.div`
  font-size: 1rem;
  color: #77ACB7;
  opacity: 0.8;
`;

const Footer = () => (
  <FooterContainer>
    <Socials>
      <SocialIcon href="#" aria-label="Instagram"><FiInstagram /></SocialIcon>
      <SocialIcon href="#" aria-label="Twitter"><FiTwitter /></SocialIcon>
      <SocialIcon href="#" aria-label="Facebook"><FiFacebook /></SocialIcon>
    </Socials>
    <Copy>&copy; {new Date().getFullYear()} LUXURY. All rights reserved.</Copy>
  </FooterContainer>
);

export default Footer; 