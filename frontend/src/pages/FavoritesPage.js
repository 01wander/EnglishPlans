import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import FavoritesManager from '../components/FavoritesManager';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize.xxl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
`;

const FavoritesPage = () => {
  return (
    <Container>
      <Title>我的收藏</Title>
      <FavoritesManager />
    </Container>
  );
};

export default FavoritesPage; 