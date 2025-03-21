import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const Description = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  background: white;
  border-radius: 15px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.4;
`;

const HomePage = () => {
  const playSound = (word) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <PageTitle>英语学习 English Learning</PageTitle>
      <Description>
        欢迎来到英语学习平台！选择下面的学习内容开始你的英语学习之旅。
        <br />
        Welcome to the English Learning Platform! Choose a category below to start your learning journey.
      </Description>
      
      <CardsGrid>
        <Card to="/alphabet">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Alphabet');
          }}>🔤</CardIcon>
          <CardTitle>字母</CardTitle>
          <CardDescription>
            学习英语字母A-Z
            <br />
            Learn English alphabet A-Z
          </CardDescription>
        </Card>

        <Card to="/numbers">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Numbers');
          }}>🔢</CardIcon>
          <CardTitle>数字</CardTitle>
          <CardDescription>
            学习英语数字1-20
            <br />
            Learn English numbers 1-20
          </CardDescription>
        </Card>

        <Card to="/colors">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Colors');
          }}>🎨</CardIcon>
          <CardTitle>颜色</CardTitle>
          <CardDescription>
            学习基本颜色的英语表达
            <br />
            Learn English expressions for basic colors
          </CardDescription>
        </Card>

        <Card to="/animals">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Animals');
          }}>🦁</CardIcon>
          <CardTitle>动物</CardTitle>
          <CardDescription>
            学习常见动物的英文名称
            <br />
            Learn English names for common animals
          </CardDescription>
        </Card>
        
        <Card to="/greetings">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Greetings');
          }}>👋</CardIcon>
          <CardTitle>日常用语</CardTitle>
          <CardDescription>
            学习基本的英语日常对话和问候语
            <br />
            Learn basic English daily conversations and greetings
          </CardDescription>
        </Card>
        
        <Card to="/songs">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Songs');
          }}>🎵</CardIcon>
          <CardTitle>儿歌童谣</CardTitle>
          <CardDescription>
            通过有趣的英文儿歌和童谣学习英语
            <br />
            Learn English through fun children's songs and nursery rhymes
          </CardDescription>
        </Card>
        
        <Card to="/food">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Food');
          }}>🍽️</CardIcon>
          <CardTitle>食物词汇</CardTitle>
          <CardDescription>
            学习常见食物和饮料的英语表达
            <br />
            Learn English expressions for common foods and drinks
          </CardDescription>
        </Card>

        <Card to="/body-parts">
          <CardIcon onClick={(e) => {
            e.preventDefault();
            playSound('Body parts');
          }}>👤</CardIcon>
          <CardTitle>身体部位</CardTitle>
          <CardDescription>
            学习人体各部位的英语词汇
            <br />
            Learn English vocabulary for parts of the body
          </CardDescription>
        </Card>
      </CardsGrid>

      <ScrollToTop />
    </Container>
  );
};

export default HomePage; 