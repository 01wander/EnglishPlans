import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled(Link)`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const CardDescription = styled.p`
  color: #666;
  text-align: center;
  font-size: 1rem;
`;

const BasicLearningPage = () => {
  const learningItems = [
    {
      path: '/alphabet',
      icon: '🔤',
      title: '字母',
      description: '学习英语字母 A-Z，包括发音和书写'
    },
    {
      path: '/numbers',
      icon: '🔢',
      title: '数字',
      description: '学习基础数字 1-100 的英文表达'
    },
    {
      path: '/colors',
      icon: '🎨',
      title: '颜色',
      description: '学习常见颜色的英文表达'
    },
    {
      path: '/animals',
      icon: '🐻',
      title: '动物',
      description: '学习常见动物的英文名称'
    },
    {
      path: '/food',
      icon: '🍽️',
      title: '食物',
      description: '学习常见食物的英文表达'
    },
    {
      path: '/body-parts',
      icon: '👤',
      title: '身体部位',
      description: '学习人体各部位的英文词汇'
    }
  ];

  return (
    <Container>
      <Title>基础学习</Title>
      <Grid>
        {learningItems.map((item, index) => (
          <Card key={index} to={item.path}>
            <CardIcon>{item.icon}</CardIcon>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default BasicLearningPage; 