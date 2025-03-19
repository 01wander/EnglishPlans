import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #ff6347;
  text-align: center;
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const ColorCard = styled.div`
  border-radius: 15px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  background-color: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ColorDisplay = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  font-size: 5rem;
`;

const ColorInfo = styled.div`
  padding: 20px;
  flex: 1;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColorName = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const TranslationButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 6px 12px;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin: 0 auto;
  width: fit-content;

  &:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
  }
`;

const Translation = styled.div`
  font-size: 1.2rem;
  color: #666;
  height: ${props => props.show ? 'auto' : '0'};
  opacity: ${props => props.show ? 1 : 0};
  transition: all 0.3s;
  margin: 5px 0;
`;

const ExampleSentence = styled.div`
  font-size: 1.1rem;
  color: #888;
  font-style: italic;
  cursor: pointer;
  padding: 12px 15px;
  border-radius: 10px;
  line-height: 1.4;
  
  &:hover {
    background-color: #fff3f0;
  }
`;

const ExampleTranslation = styled.div`
  font-size: 1rem;
  color: #666;
  font-style: italic;
  height: ${props => props.show ? 'auto' : '0'};
  opacity: ${props => props.show ? 1 : 0};
  transition: all 0.3s;
  padding: 0 5px;
`;

const ColorsPage = () => {
  const [showTranslations, setShowTranslations] = useState({});

  const colors = [
    { name: 'Red', hex: '#ff0000', emoji: '🔴', translation: '红色', example: 'The rose is red.', exampleTranslation: '玫瑰是红色的。' },
    { name: 'Blue', hex: '#0000ff', emoji: '🔵', translation: '蓝色', example: 'The sky is blue.', exampleTranslation: '天空是蓝色的。' },
    { name: 'Green', hex: '#00ff00', emoji: '🟢', translation: '绿色', example: 'Fresh grass is green.', exampleTranslation: '新鲜的草是绿色的。' },
    { name: 'Yellow', hex: '#ffff00', emoji: '🟡', translation: '黄色', example: 'The sun is yellow.', exampleTranslation: '太阳是黄色的。' },
    { name: 'Orange', hex: '#ffa500', emoji: '🟠', translation: '橙色', example: 'The orange is orange.', exampleTranslation: '橙子是橙色的。' },
    { name: 'Purple', hex: '#800080', emoji: '🟣', translation: '紫色', example: 'The grape is purple.', exampleTranslation: '葡萄是紫色的。' },
    { name: 'Black', hex: '#000000', emoji: '⚫', translation: '黑色', example: 'The night is black.', exampleTranslation: '夜晚是黑色的。' },
    { name: 'White', hex: '#ffffff', emoji: '⚪', translation: '白色', example: 'Snow is white.', exampleTranslation: '雪是白色的。' },
    { name: 'Brown', hex: '#a52a2a', emoji: '🟤', translation: '棕色', example: 'The tree is brown.', exampleTranslation: '树是棕色的。' },
    { name: 'Pink', hex: '#ffc0cb', emoji: '🩷', translation: '粉色', example: 'The flower is pink.', exampleTranslation: '花是粉色的。' },
    { name: 'Gray', hex: '#808080', emoji: '⚪', translation: '灰色', example: 'The cloud is gray.', exampleTranslation: '云是灰色的。' },
    { name: 'Gold', hex: '#ffd700', emoji: '🟨', translation: '金色', example: 'The crown is gold.', exampleTranslation: '皇冠是金色的。' }
  ];
  
  const toggleTranslation = (colorName) => {
    setShowTranslations(prev => ({
      ...prev,
      [colorName]: !prev[colorName]
    }));
  };
  
  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <Container>
      <PageTitle>英语颜色</PageTitle>
      <Description>
        点击颜色卡片，学习常见颜色的英语表达和发音。
        每种颜色都有对应的表情符号、中文翻译和简单例句！
      </Description>
      
      <ColorsGrid>
        {colors.map((color, index) => (
          <ColorCard 
            key={index}
            onClick={() => playSound(color.name)}
          >
            <ColorDisplay color={color.hex}>{color.emoji}</ColorDisplay>
            <ColorInfo>
              <ColorName>{color.name}</ColorName>
              <TranslationButton 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTranslation(color.name);
                }}
              >
                显示翻译
              </TranslationButton>
              <Translation show={showTranslations[color.name]}>
                {color.translation}
              </Translation>
              <ExampleSentence onClick={(e) => {
                e.stopPropagation();
                playSound(color.example);
              }}>
                {color.example}
              </ExampleSentence>
              <ExampleTranslation show={showTranslations[color.name]}>
                {color.exampleTranslation}
              </ExampleTranslation>
            </ColorInfo>
          </ColorCard>
        ))}
      </ColorsGrid>
    </Container>
  );
};

export default ColorsPage; 