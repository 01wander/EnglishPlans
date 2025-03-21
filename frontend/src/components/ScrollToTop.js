import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
  color: white;
  border: none;
  cursor: pointer;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(33, 150, 243, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollButton 
      show={showButton} 
      onClick={scrollToTop}
      title="返回顶部"
    >
      ⬆️
    </ScrollButton>
  );
};

export default ScrollToTop; 