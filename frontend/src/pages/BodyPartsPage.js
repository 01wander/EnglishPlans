import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { message } from 'antd';
import { updateFavoriteStatus, updateLearningProgress } from '../api/userApi';
import { useUser } from '../contexts/UserContext';
import { theme } from '../styles/theme';
import PartCard from '../components/PartCard';
import {
  Container,
  PageTitle,
  Description,
  CategoryTabs,
  CategoryTab,
  PartsGrid,
  PartCard as StyledPartCard,
  PartEmoji,
  PartName,
  PartNameChinese,
  TranslationButton,
  ExampleSentence,
  ExampleTranslation
} from '../styles/BodyPartsStyles';
import { FaStar, FaRegStar, FaCheck } from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop';

const Title = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: 30px;
  text-align: center;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const BodyPartsPage = () => {
  const { user, updateUser } = useUser();
  const [loading, setLoading] = useState({});

  const bodyParts = [
    { id: 'head', name: '头部', description: '包括头部相关的英语词汇' },
    { id: 'face', name: '脸部', description: '包括脸部相关的英语词汇' },
    { id: 'arm', name: '手臂', description: '包括手臂相关的英语词汇' },
    { id: 'leg', name: '腿部', description: '包括腿部相关的英语词汇' },
    { id: 'body', name: '躯干', description: '包括躯干相关的英语词汇' },
  ];

  const handleCardClick = async (partId) => {
    try {
      setLoading(prev => ({ ...prev, [partId]: true }));
      await updateLearningProgress('bodyParts', partId);
      
      // 更新本地状态
      updateUser(prev => ({
        ...prev,
        learningProgress: {
          ...prev.learningProgress,
          [`bodyParts_${partId}`]: true
        }
      }));
      
      message.success('学习进度已更新');
    } catch (error) {
      message.error('更新学习进度失败');
      console.error('Error updating progress:', error);
    } finally {
      setLoading(prev => ({ ...prev, [partId]: false }));
    }
  };

  const handleFavoriteClick = async (partId) => {
    try {
      setLoading(prev => ({ ...prev, [`fav_${partId}`]: true }));
      const isFavorited = user.favorites.includes(`bodyParts_${partId}`);
      
      await updateFavoriteStatus('bodyParts', partId, !isFavorited);
      
      // 更新本地状态
      updateUser(prev => ({
        ...prev,
        favorites: isFavorited
          ? prev.favorites.filter(id => id !== `bodyParts_${partId}`)
          : [...prev.favorites, `bodyParts_${partId}`]
      }));
      
      message.success(isFavorited ? '已取消收藏' : '已添加到收藏');
    } catch (error) {
      message.error('更新收藏状态失败');
      console.error('Error updating favorite status:', error);
    } finally {
      setLoading(prev => ({ ...prev, [`fav_${partId}`]: false }));
    }
  };

  return (
    <Container>
      <Title>人体部位词汇学习</Title>
      <Description>
        点击卡片开始学习相应部位的词汇。
        点击星标可以将内容添加到收藏夹。
        完成学习后会自动标记为已学习。
      </Description>
      <CardsContainer>
        {bodyParts.map(part => (
          <PartCard
            key={part.id}
            title={part.name}
            description={part.description}
            completed={user?.learningProgress?.[`bodyParts_${part.id}`] || false}
            favorite={user?.favorites?.includes(`bodyParts_${part.id}`) || false}
            loading={loading[part.id] || loading[`fav_${part.id}`] || false}
            onCardClick={() => handleCardClick(part.id)}
            onFavoriteClick={() => handleFavoriteClick(part.id)}
          />
        ))}
      </CardsContainer>
    </Container>
  );
};

export default BodyPartsPage; 