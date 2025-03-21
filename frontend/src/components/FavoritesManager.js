import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaStar, FaPlay, FaTrash } from 'react-icons/fa';

const FavoritesContainer = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border.light};
`;

const CategoryTab = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background: none;
  color: ${props => props.active ? theme.colors.primary : theme.colors.text.secondary};
  border-bottom: 2px solid ${props => props.active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const FavoriteCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ItemEmoji = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.sm};
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;

const ItemTranslation = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.text.secondary};
`;

const FavoritesManager = () => {
  const [activeCategory, setActiveCategory] = useState('bodyParts');
  const [favorites, setFavorites] = useState({
    bodyParts: [
      { id: 'eyes', emoji: '👀', english: 'Eyes', chinese: '眼睛' },
      { id: 'brain', emoji: '🧠', english: 'Brain', chinese: '大脑' }
    ],
    animals: [
      { id: 'cat', emoji: '🐱', english: 'Cat', chinese: '猫' }
    ],
    colors: []
  });

  const categories = [
    { id: 'bodyParts', name: '身体部位', icon: '👤' },
    { id: 'animals', name: '动物', icon: '🐻' },
    { id: 'colors', name: '颜色', icon: '🎨' }
  ];

  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const removeFavorite = (categoryId, itemId) => {
    setFavorites(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(item => item.id !== itemId)
    }));
  };

  return (
    <FavoritesContainer>
      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.name}
            {favorites[category.id].length > 0 && ` (${favorites[category.id].length})`}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {favorites[activeCategory].length > 0 ? (
        favorites[activeCategory].map(item => (
          <FavoriteCard key={item.id}>
            <ItemEmoji>{item.emoji}</ItemEmoji>
            <ItemInfo>
              <ItemName>{item.english}</ItemName>
              <ItemTranslation>{item.chinese}</ItemTranslation>
            </ItemInfo>
            <ActionButton onClick={() => playSound(item.english)}>
              <FaPlay />
            </ActionButton>
            <ActionButton onClick={() => removeFavorite(activeCategory, item.id)}>
              <FaTrash />
            </ActionButton>
          </FavoriteCard>
        ))
      ) : (
        <EmptyState>
          暂无收藏内容
        </EmptyState>
      )}
    </FavoritesContainer>
  );
};

export default FavoritesManager; 