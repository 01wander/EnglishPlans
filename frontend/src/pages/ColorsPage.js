import React, { useState } from 'react';
import {
  Container,
  PageTitle,
  Description,
  ColorsGrid,
  ColorCard,
  ColorDisplay,
  ColorInfo,
  ColorName,
  TranslationButton,
  Translation,
  ExampleSentence,
  ExampleTranslation
} from '../styles/ColorsStyles';

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