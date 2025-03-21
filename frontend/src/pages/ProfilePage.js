import React from 'react';
import styled from 'styled-components';
import { useUser } from '../contexts/UserContext';
import { theme } from '../styles/theme';
import AudioControls from '../components/AudioControls';
import LearningGoals from '../components/LearningGoals';
import FavoritesManager from '../components/FavoritesManager';
import Achievements from '../components/Achievements';
import { FaCog, FaTrophy, FaStar, FaChartLine } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.xxl};
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

const QuickStats = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-left: auto;
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.sm};
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

const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
`;

const Section = styled.div`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};

  &.full-width {
    grid-column: span 2;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

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
        
        <QuickStats>
          <StatCard>
            <StatValue>2</StatValue>
            <StatLabel>已获成就</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>3</StatValue>
            <StatLabel>收藏内容</StatLabel>
          </StatCard>
        </QuickStats>
      </Header>

      <MainContent>
        <Section>
          <SectionTitle>
            <FaCog /> 音频设置
          </SectionTitle>
          <AudioControls />
        </Section>

        <Section>
          <SectionTitle>
            <FaChartLine /> 学习目标
          </SectionTitle>
          <LearningGoals />
        </Section>

        <Section>
          <SectionTitle>
            <FaTrophy /> 成就徽章
          </SectionTitle>
          <Achievements />
        </Section>

        <Section className="full-width">
          <SectionTitle>
            <FaStar /> 我的收藏
          </SectionTitle>
          <FavoritesManager />
        </Section>
      </MainContent>
    </Container>
  );
};

export default ProfilePage; 