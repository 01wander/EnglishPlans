import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import LoginModal from './LoginModal';
import { theme } from '../styles/theme';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  padding-right: 20px;
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
`;

const SettingsButton = styled(Button)`
  background: transparent;
  color: ${theme.colors.text};
  padding: 8px;

  &:hover {
    background: ${theme.colors.backgroundLight};
  }
`;

const MyButton = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleMyClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    navigate('/profile#settings');
  };

  const handleLogin = (userData) => {
    login(userData);
    setShowLoginModal(false);
  };

  return (
    <ButtonContainer>
      <Button onClick={handleMyClick}>
        {user ? (
          <>
            <Avatar>{user.username[0].toUpperCase()}</Avatar>
            {user.username}
          </>
        ) : (
          <>
            <span>👤</span>
            登录
          </>
        )}
      </Button>
      <SettingsButton onClick={handleSettingsClick}>
        ⚙️
      </SettingsButton>
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
        />
      )}
    </ButtonContainer>
  );
};

export default MyButton; 