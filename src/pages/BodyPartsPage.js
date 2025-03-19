import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const Description = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 1.2rem;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.active ? '#3498db' : '#f0f2f5'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#e4e7eb'};
  }
`;

const PartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 10px;
`;

const PartCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PartEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const PartName = styled.div`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const PartNameChinese = styled.div`
  font-size: 1rem;
  color: #7f8c8d;
`;

const ExampleSentence = styled.div`
  font-size: 0.9rem;
  color: #95a5a6;
  margin-top: 8px;
  font-style: italic;
  padding-top: 8px;
  border-top: 1px dashed #ecf0f1;
`;

const bodyParts = {
  face: [
    { emoji: "👀", english: "Eyes", chinese: "眼睛", example: "I can see with my eyes." },
    { emoji: "👃", english: "Nose", chinese: "鼻子", example: "I smell with my nose." },
    { emoji: "👄", english: "Mouth", chinese: "嘴巴", example: "I eat with my mouth." },
    { emoji: "👂", english: "Ears", chinese: "耳朵", example: "I hear with my ears." },
    { emoji: "👅", english: "Tongue", chinese: "舌头", example: "I taste with my tongue." },
    { emoji: "🦷", english: "Teeth", chinese: "牙齿", example: "I brush my teeth." },
    { emoji: "👁️", english: "Eye", chinese: "眼睛", example: "My eye is blue." },
    { emoji: "🧠", english: "Brain", chinese: "大脑", example: "I think with my brain." }
  ],
  body: [
    { emoji: "💪", english: "Arm", chinese: "手臂", example: "I lift with my arm." },
    { emoji: "🦿", english: "Leg", chinese: "腿", example: "I run with my legs." },
    { emoji: "🦶", english: "Foot", chinese: "脚", example: "I walk on my feet." },
    { emoji: "🤚", english: "Hand", chinese: "手", example: "I write with my hand." },
    { emoji: "👈", english: "Finger", chinese: "手指", example: "I point with my finger." },
    { emoji: "🦵", english: "Knee", chinese: "膝盖", example: "I bend my knee." },
    { emoji: "🫁", english: "Lungs", chinese: "肺", example: "I breathe with my lungs." },
    { emoji: "❤️", english: "Heart", chinese: "心脏", example: "My heart beats." }
  ],
  actions: [
    { emoji: "🏃", english: "Running", chinese: "跑步", example: "I am running fast." },
    { emoji: "👋", english: "Waving", chinese: "挥手", example: "I wave goodbye." },
    { emoji: "👏", english: "Clapping", chinese: "鼓掌", example: "I clap my hands." },
    { emoji: "🤝", english: "Shaking hands", chinese: "握手", example: "Nice to meet you." },
    { emoji: "👍", english: "Thumbs up", chinese: "竖起大拇指", example: "Good job!" },
    { emoji: "🙋", english: "Raising hand", chinese: "举手", example: "I know the answer!" },
    { emoji: "🤗", english: "Hugging", chinese: "拥抱", example: "I hug my friend." },
    { emoji: "🤔", english: "Thinking", chinese: "思考", example: "I am thinking hard." }
  ]
};

const BodyPartsPage = () => {
  const [activeCategory, setActiveCategory] = useState('face');
  
  const playSound = (text) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <PageTitle>身体部位 Body Parts</PageTitle>
      <Description>点击卡片听发音，包含示例句</Description>
      
      <CategoryTabs>
        <Tab 
          active={activeCategory === 'face'} 
          onClick={() => setActiveCategory('face')}
        >
          👀 脸部 Face
        </Tab>
        <Tab 
          active={activeCategory === 'body'} 
          onClick={() => setActiveCategory('body')}
        >
          💪 身体 Body
        </Tab>
        <Tab 
          active={activeCategory === 'actions'} 
          onClick={() => setActiveCategory('actions')}
        >
          🏃 动作 Actions
        </Tab>
      </CategoryTabs>
      
      <PartsGrid>
        {bodyParts[activeCategory].map((part, index) => (
          <PartCard key={index} onClick={() => playSound(part.english)}>
            <PartEmoji>{part.emoji}</PartEmoji>
            <PartName>{part.english}</PartName>
            <PartNameChinese>{part.chinese}</PartNameChinese>
            <ExampleSentence>{part.example}</ExampleSentence>
          </PartCard>
        ))}
      </PartsGrid>
    </Container>
  );
};

export default BodyPartsPage; 