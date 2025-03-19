import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Howl } from 'howler';

const Container = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff6347;
  text-align: center;
  margin-bottom: 50px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
`;

const Card = styled(Link)`
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  text-decoration: none;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardEmoji = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
`;

const HomePage = () => {
  const content = [
    {
      title: '字母',
      emoji: '🔤',
      description: '学习英语字母A-Z',
      path: '/alphabet',
      sound: 'alphabet'
    },
    {
      title: '数字',
      emoji: '🔢',
      description: '学习英语数字1-20',
      path: '/numbers',
      sound: 'numbers'
    },
    {
      title: '颜色',
      emoji: '🎨',
      description: '学习各种颜色的英文表达',
      path: '/colors',
      sound: 'colors'
    },
    {
      title: '动物',
      emoji: '🦁',
      description: '学习常见动物的英文名称',
      path: '/animals',
      sound: 'animals'
    }
  ];

  const playSound = (word) => {
    // 使用Web Speech API进行发音
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <Title>学习内容</Title>
      <ContentGrid>
        {content.map((item) => (
          <Card key={item.path} to={item.path}>
            <CardEmoji 
              onClick={(e) => {
                e.preventDefault(); // 防止触发链接跳转
                playSound(item.title);
              }}
            >
              {item.emoji}
            </CardEmoji>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </ContentGrid>
    </Container>
  );
};

export default HomePage; 