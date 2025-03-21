import React from 'react';
import styled from 'styled-components';
import { useUser } from '../contexts/UserContext';
import { theme } from '../styles/theme';

const ProgressContainer = styled.div`
  background-color: ${theme.colors.background.secondary};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: ${theme.colors.background.primary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSize.xxl};
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const HistoryList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TimeStamp = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  width: 150px;
`;

const Category = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

const Status = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${props => 
    props.status === 'completed' ? theme.colors.primary : theme.colors.text.secondary};
`;

const LearningProgress = () => {
  const { learningHistory, getStatistics } = useUser();
  const stats = getStatistics();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryName = (category) => {
    const categories = {
      bodyParts: '身体部位',
      animals: '动物',
      colors: '颜色',
      numbers: '数字'
    };
    return categories[category] || category;
  };

  const getStatusText = (status) => {
    const statusMap = {
      completed: '已完成',
      inProgress: '学习中',
      started: '已开始'
    };
    return statusMap[status] || status;
  };

  return (
    <ProgressContainer>
      <Title>学习进度</Title>
      
      <StatGrid>
        <StatCard>
          <StatValue>{stats.totalItems}</StatValue>
          <StatLabel>总学习项目</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.completedItems}</StatValue>
          <StatLabel>已完成项目</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.favoriteItems}</StatValue>
          <StatLabel>收藏项目</StatLabel>
        </StatCard>
      </StatGrid>

      <Title>最近学习</Title>
      <HistoryList>
        {learningHistory.map((record, index) => (
          <HistoryItem key={index}>
            <TimeStamp>{formatDate(record.timestamp)}</TimeStamp>
            <Category>{getCategoryName(record.category)}</Category>
            <Status status={record.status}>
              {getStatusText(record.status)}
            </Status>
          </HistoryItem>
        ))}
      </HistoryList>
    </ProgressContainer>
  );
};

export default LearningProgress; 