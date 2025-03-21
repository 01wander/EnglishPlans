import React from 'react';
import styled from 'styled-components';
import { Card, Spin } from 'antd';
import { StarOutlined, StarFilled, CheckOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .ant-card-body {
    position: relative;
    padding: 24px;
  }
  
  &.completed {
    border-color: ${theme.colors.success};
  }
`;

const Title = styled.h3`
  margin: 0 0 8px;
  color: ${theme.colors.primary};
  font-size: 1.2em;
`;

const Description = styled.p`
  color: ${theme.colors.text};
  margin: 0;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
`;

const ActionIcon = styled.span`
  cursor: pointer;
  font-size: 1.2em;
  
  &:hover {
    opacity: 0.8;
  }
`;

const PartCard = ({
  title,
  description,
  completed,
  favorite,
  loading,
  onCardClick,
  onFavoriteClick
}) => {
  return (
    <StyledCard
      className={completed ? 'completed' : ''}
      onClick={onCardClick}
      hoverable
    >
      <Spin spinning={loading}>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <IconWrapper>
          {completed && (
            <ActionIcon style={{ color: theme.colors.success }}>
              <CheckOutlined />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick();
            }}
            style={{ color: favorite ? theme.colors.warning : theme.colors.text }}
          >
            {favorite ? <StarFilled /> : <StarOutlined />}
          </ActionIcon>
        </IconWrapper>
      </Spin>
    </StyledCard>
  );
};

export default PartCard; 