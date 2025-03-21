import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ff6347;
  font-size: 1.8rem;
  font-weight: bold;
`;

const LogoEmoji = styled.span`
  font-size: 2.5rem;
  margin-right: 10px;
`;

const MenuItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`;

const MenuItem = styled.li`
  margin: 0 15px;

  @media (max-width: 768px) {
    margin: 10px 0;
    text-align: center;
  }
`;

const MenuLink = styled(Link)`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s;
  padding: 8px 12px;
  border-radius: 20px;
  position: relative;

  &:hover, &.active {
    color: #ff6347;
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #ff6347;
    border-radius: 3px;
  }
`;

const MenuButton = styled.button`
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <div className="container">
        <Nav>
          <Logo to="/">
            <LogoEmoji>📚</LogoEmoji>
            趣味英语乐园
          </Logo>

          <MenuButton onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MenuButton>

          <MenuItems isOpen={isMenuOpen}>
            <MenuItem>
              <MenuLink to="/" className={isActive('/')}>
                首页
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/alphabet" className={isActive('/alphabet')}>
                字母
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/numbers" className={isActive('/numbers')}>
                数字
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/colors" className={isActive('/colors')}>
                颜色
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/animals" className={isActive('/animals')}>
                动物
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/greetings" className={isActive('/greetings')}>
                日常用语
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/songs" className={isActive('/songs')}>
                儿歌童谣
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/food" className={isActive('/food')}>
                食物
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/body-parts" className={isActive('/body-parts')}>
                身体部位
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/games/memory" className={isActive('/games/memory')}>
                记忆游戏
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/games/word-match" className={isActive('/games/word-match')}>
                单词匹配
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/games/listening" className={isActive('/games/listening')}>
                听力游戏
              </MenuLink>
            </MenuItem>
          </MenuItems>
        </Nav>
      </div>
    </HeaderContainer>
  );
};

export default Header; 