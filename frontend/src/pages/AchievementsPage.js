import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import Achievements from '../components/Achievements';

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

const AchievementsPage = () => {
  return (
    <Container>
      <Title>成就徽章</Title>
      <Achievements />
    </Container>
  );
};

export default AchievementsPage; 