import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaTrophy, FaMedal, FaStar, FaCrown, FaLock } from 'react-icons/fa';

const AchievementsContainer = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const AchievementCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  opacity: ${props => props.unlocked ? 1 : 0.6};
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.unlocked ? theme.colors.primary : theme.colors.background.secondary};
  color: ${props => props.unlocked ? 'white' : theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const AchievementInfo = styled.div`
  flex: 1;
`;

const AchievementTitle = styled.div`
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const AchievementDescription = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const ProgressText = styled.div`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
`;

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: '学习先锋',
      description: '完成第一次学习',
      icon: <FaTrophy />,
      unlocked: true,
      progress: '已完成'
    },
    {
      id: 2,
      title: '坚持不懈',
      description: '连续学习7天',
      icon: <FaMedal />,
      unlocked: true,
      progress: '已完成'
    },
    {
      id: 3,
      title: '收藏达人',
      description: '收藏10个学习项目',
      icon: <FaStar />,
      unlocked: false,
      progress: '6/10'
    },
    {
      id: 4,
      title: '学习大师',
      description: '完成所有基础课程',
      icon: <FaCrown />,
      unlocked: false,
      progress: '30%'
    },
    {
      id: 5,
      title: '完美发音',
      description: '连续正确发音20次',
      icon: <FaMedal />,
      unlocked: false,
      progress: '8/20'
    },
    {
      id: 6,
      title: '记忆达人',
      description: '一次测试全部正确',
      icon: <FaTrophy />,
      unlocked: false,
      progress: '未开始'
    }
  ];

  return (
    <AchievementsContainer>
      <AchievementGrid>
        {achievements.map(achievement => (
          <AchievementCard key={achievement.id} unlocked={achievement.unlocked}>
            <IconWrapper unlocked={achievement.unlocked}>
              {achievement.unlocked ? achievement.icon : <FaLock />}
            </IconWrapper>
            <AchievementInfo>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementDescription>{achievement.description}</AchievementDescription>
              <ProgressText>{achievement.progress}</ProgressText>
            </AchievementInfo>
          </AchievementCard>
        ))}
      </AchievementGrid>
    </AchievementsContainer>
  );
};

export default Achievements; 