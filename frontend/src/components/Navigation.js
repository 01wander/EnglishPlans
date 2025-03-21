import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../api/auth';
import LoginModal from './LoginModal';
import { FaCog, FaTrophy, FaStar, FaChartLine, FaUser } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: #4CAF50;
  padding: 0 2rem;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavItem = styled.div`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  
  &:hover > div {
    display: block;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0 15px;
  height: 60px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  border-radius: 4px;
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  color: #333;
  padding: 12px 15px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #f5f5f5;
  }

  .icon {
    font-size: 20px;
  }

  .text {
    flex: 1;
  }

  .description {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
  }
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0 15px;
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Navigation = ({ user, onLogin, onLogout }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      if (onLogout) {
        onLogout();
      }
      navigate('/');
    } catch (error) {
      console.error('登出错误:', error);
    }
  };

  const handleMenuClick = (path) => {
    setActiveDropdown(null);
    navigate(path);
  };

  const navItems = [
    {
      title: '基础学习',
      items: [
        { icon: '🔤', text: '字母', description: '学习英语字母 A-Z', path: '/alphabet' },
        { icon: '🔢', text: '数字', description: '学习基础数字 1-100', path: '/numbers' },
        { icon: '🎨', text: '颜色', description: '学习常见颜色', path: '/colors' },
        { icon: '🐻', text: '动物', description: '学习动物名称', path: '/animals' },
        { icon: '🍽️', text: '食物', description: '学习食物词汇', path: '/food' },
        { icon: '👤', text: '身体部位', description: '学习身体部位词汇', path: '/body-parts' }
      ]
    },
    {
      title: '游戏',
      items: [
        { icon: '🎮', text: '记忆游戏', description: '训练记忆力', path: '/games/memory' },
        { icon: '🎯', text: '单词匹配', description: '练习词汇', path: '/games/word-match' },
        { icon: '🎧', text: '听力游戏', description: '提高听力', path: '/games/listening' }
      ]
    }
  ];

  const userMenuItems = [
    { icon: <FaUser />, text: '个人资料', description: '查看个人信息', path: '/profile' },
    { icon: <FaChartLine />, text: '学习目标', description: '设置和查看学习目标', path: '/profile/goals' },
    { icon: <FaStar />, text: '我的收藏', description: '管理收藏的内容', path: '/profile/favorites' },
    { icon: <FaTrophy />, text: '成就徽章', description: '查看获得的成就', path: '/profile/achievements' },
    { icon: <FaCog />, text: '音频设置', description: '调整语音播放设置', path: '/profile/settings' }
  ];

  return (
    <Nav>
      <NavContent>
        <NavSection>
          <NavLink to="/">首页</NavLink>
          {navItems.map((category, index) => (
            <NavItem 
              key={index}
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink to="#">
                {category.title}
              </NavLink>
              <Dropdown style={{ display: activeDropdown === index ? 'block' : 'none' }}>
                {category.items.map((item, itemIndex) => (
                  <DropdownItem 
                    key={itemIndex} 
                    as="button"
                    onClick={() => handleMenuClick(item.path)}
                  >
                    <span className="icon">{item.icon}</span>
                    <div className="text">
                      {item.text}
                      <div className="description">{item.description}</div>
                    </div>
                  </DropdownItem>
                ))}
              </Dropdown>
            </NavItem>
          ))}
        </NavSection>
        <NavSection>
          {!user ? (
            <>
              <UserButton onClick={() => setShowLoginModal(true)}>
                登录
              </UserButton>
              {showLoginModal && (
                <LoginModal 
                  onClose={() => setShowLoginModal(false)}
                  onLogin={data => {
                    if (onLogin && typeof onLogin === 'function') {
                      onLogin(data);
                    }
                    setShowLoginModal(false);
                  }}
                />
              )}
            </>
          ) : (
            <NavItem>
              <UserButton>
                {user.username}
              </UserButton>
              <Dropdown>
                {userMenuItems.map((item, index) => (
                  <DropdownItem 
                    key={index}
                    as="button"
                    onClick={() => handleMenuClick(item.path)}
                  >
                    <span className="icon">{item.icon}</span>
                    <div className="text">
                      {item.text}
                      <div className="description">{item.description}</div>
                    </div>
                  </DropdownItem>
                ))}
                <DropdownItem as="button" onClick={handleLogout}>
                  <span className="icon">🚪</span>
                  <div className="text">
                    退出登录
                  </div>
                </DropdownItem>
              </Dropdown>
            </NavItem>
          )}
        </NavSection>
      </NavContent>
    </Nav>
  );
};

export default Navigation; 