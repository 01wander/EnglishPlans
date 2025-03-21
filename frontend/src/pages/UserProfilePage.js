import React from 'react';
import styled from 'styled-components';
import { useUser } from '../contexts/UserContext';
import { theme } from '../styles/theme';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.xxxl};
  color: white;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Username = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const JoinDate = styled.p`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const Section = styled.div`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${theme.colors.background.secondary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.primary};
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

const UserProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const stats = {
    totalLearned: 120,
    daysStreak: 7,
    achievements: 5,
    favorites: 12,
    totalTime: '15h',
    avgScore: '85%'
  };

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar>
            {user.username[0].toUpperCase()}
          </Avatar>
          <UserDetails>
            <Username>{user.username}</Username>
            <JoinDate>加入时间：2024年3月</JoinDate>
          </UserDetails>
        </UserInfo>
      </Header>

      <Section>
        <SectionTitle>学习统计</SectionTitle>
        <StatGrid>
          <StatCard>
            <StatValue>{stats.totalLearned}</StatValue>
            <StatLabel>已学习单词</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.daysStreak}</StatValue>
            <StatLabel>连续学习天数</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.achievements}</StatValue>
            <StatLabel>获得成就</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.favorites}</StatValue>
            <StatLabel>收藏内容</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.totalTime}</StatValue>
            <StatLabel>总学习时长</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.avgScore}</StatValue>
            <StatLabel>平均正确率</StatLabel>
          </StatCard>
        </StatGrid>
      </Section>
    </Container>
  );
};

export default UserProfilePage; 