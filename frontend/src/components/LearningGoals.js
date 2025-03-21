import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaTrophy, FaEdit, FaCheck } from 'react-icons/fa';

const GoalsContainer = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
`;

const GoalCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GoalInfo = styled.div`
  flex: 1;
`;

const GoalTitle = styled.h4`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const GoalProgress = styled.div`
  height: 8px;
  background: ${theme.colors.background.secondary};
  border-radius: 4px;
  margin-top: ${theme.spacing.sm};
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const GoalActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
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

const AddGoalButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  margin-top: ${theme.spacing.md};
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const LearningGoals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: '每日学习单词',
      target: 20,
      current: 15,
      unit: '个',
      icon: '📚'
    },
    {
      id: 2,
      title: '完成练习',
      target: 5,
      current: 3,
      unit: '个',
      icon: '✍️'
    },
    {
      id: 3,
      title: '学习时长',
      target: 30,
      current: 20,
      unit: '分钟',
      icon: '⏱️'
    }
  ]);

  return (
    <GoalsContainer>
      {goals.map(goal => (
        <GoalCard key={goal.id}>
          <GoalInfo>
            <GoalTitle>
              {goal.icon} {goal.title}
            </GoalTitle>
            <div>
              进度：{goal.current}/{goal.target} {goal.unit}
            </div>
            <GoalProgress>
              <ProgressBar progress={(goal.current / goal.target) * 100} />
            </GoalProgress>
          </GoalInfo>
          <GoalActions>
            <ActionButton>
              <FaEdit />
            </ActionButton>
            {goal.current >= goal.target && (
              <ActionButton style={{ color: '#4CAF50' }}>
                <FaTrophy />
              </ActionButton>
            )}
          </GoalActions>
        </GoalCard>
      ))}
      <AddGoalButton>
        + 添加新目标
      </AddGoalButton>
    </GoalsContainer>
  );
};

export default LearningGoals; 