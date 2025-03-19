import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #ffeecc;
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copyright = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: #666;
`;

const Character = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <Character src="/character.png" alt="卡通角色" className="bounce" />
          <Copyright>© {new Date().getFullYear()} 趣味英语乐园 - 为一年级小朋友设计</Copyright>
        </FooterContent>
      </div>
    </FooterContainer>
  );
};

export default Footer; 