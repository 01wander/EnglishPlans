import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import LearningGoals from '../components/LearningGoals';

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

const LearningGoalsPage = () => {
  return (
    <Container>
      <Title>学习目标</Title>
      <LearningGoals />
    </Container>
  );
};

export default LearningGoalsPage; 