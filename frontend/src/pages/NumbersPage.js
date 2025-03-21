import React, { useState } from 'react';
import {
  Container,
  PageTitle,
  Description,
  NumbersGrid,
  NumberCard,
  NumberEmoji,
  NumberValue,
  NumberWord,
  TranslationButton,
  Translation,
  ExampleSentence,
  ExampleTranslation
} from '../styles/NumbersStyles';

const NumbersPage = () => {
  const [showTranslations, setShowTranslations] = useState({});

  const numbers = [
    { value: 1, word: 'One', emoji: '1️⃣', translation: '一', example: 'I have one cat.', exampleTranslation: '我有一只猫。' },
    { value: 2, word: 'Two', emoji: '2️⃣', translation: '二', example: 'I see two birds.', exampleTranslation: '我看到两只鸟。' },
    { value: 3, word: 'Three', emoji: '3️⃣', translation: '三', example: 'Three little pigs.', exampleTranslation: '三只小猪。' },
    { value: 4, word: 'Four', emoji: '4️⃣', translation: '四', example: 'Four seasons in a year.', exampleTranslation: '一年四季。' },
    { value: 5, word: 'Five', emoji: '5️⃣', translation: '五', example: 'I have five fingers.', exampleTranslation: '我有五个手指。' },
    { value: 6, word: 'Six', emoji: '6️⃣', translation: '六', example: 'Six stars in the sky.', exampleTranslation: '天空中有六颗星星。' },
    { value: 7, word: 'Seven', emoji: '7️⃣', translation: '七', example: 'Seven days in a week.', exampleTranslation: '一周七天。' },
    { value: 8, word: 'Eight', emoji: '8️⃣', translation: '八', example: 'Eight planets in space.', exampleTranslation: '太空中有八个行星。' },
    { value: 9, word: 'Nine', emoji: '9️⃣', translation: '九', example: 'Nine lives of a cat.', exampleTranslation: '猫有九条命。' },
    { value: 10, word: 'Ten', emoji: '🔟', translation: '十', example: 'Ten toes on my feet.', exampleTranslation: '我的脚上有十个脚趾。' },
    { value: 11, word: 'Eleven', emoji: '1️⃣1️⃣', translation: '十一', example: 'Eleven players in a team.', exampleTranslation: '一个队有十一名队员。' },
    { value: 12, word: 'Twelve', emoji: '1️⃣2️⃣', translation: '十二', example: 'Twelve months in a year.', exampleTranslation: '一年十二个月。' },
    { value: 13, word: 'Thirteen', emoji: '1️⃣3️⃣', translation: '十三', example: 'Thirteen is my lucky number.', exampleTranslation: '十三是我的幸运数字。' },
    { value: 14, word: 'Fourteen', emoji: '1️⃣4️⃣', translation: '十四', example: 'Fourteen red roses.', exampleTranslation: '十四朵红玫瑰。' },
    { value: 15, word: 'Fifteen', emoji: '1️⃣5️⃣', translation: '十五', example: 'Fifteen minutes break.', exampleTranslation: '十五分钟休息。' },
    { value: 16, word: 'Sixteen', emoji: '1️⃣6️⃣', translation: '十六', example: 'She is sixteen years old.', exampleTranslation: '她十六岁了。' },
    { value: 17, word: 'Seventeen', emoji: '1️⃣7️⃣', translation: '十七', example: 'Seventeen books on the shelf.', exampleTranslation: '书架上有十七本书。' },
    { value: 18, word: 'Eighteen', emoji: '1️⃣8️⃣', translation: '十八', example: 'Eighteen wheels on a truck.', exampleTranslation: '卡车上有十八个轮子。' },
    { value: 19, word: 'Nineteen', emoji: '1️⃣9️⃣', translation: '十九', example: 'Nineteen students in class.', exampleTranslation: '班上有十九个学生。' },
    { value: 20, word: 'Twenty', emoji: '2️⃣0️⃣', translation: '二十', example: 'Twenty cookies in the jar.', exampleTranslation: '罐子里有二十块饼干。' }
  ];

  const toggleTranslation = (numberId) => {
    setShowTranslations(prev => ({
      ...prev,
      [numberId]: !prev[numberId]
    }));
  };

  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <PageTitle>英语数字</PageTitle>
      <Description>
        点击数字卡片，学习1-20的英语表达和发音。
        每个数字都有对应的表情符号、中文翻译和简单例句！
      </Description>
      
      <NumbersGrid>
        {numbers.map((number) => (
          <NumberCard 
            key={number.value}
            onClick={() => playSound(number.word)}
          >
            <NumberEmoji>{number.emoji}</NumberEmoji>
            <NumberValue>{number.value}</NumberValue>
            <NumberWord>{number.word}</NumberWord>
            <TranslationButton 
              onClick={(e) => {
                e.stopPropagation();
                toggleTranslation(number.value);
              }}
            >
              显示翻译
            </TranslationButton>
            <Translation show={showTranslations[number.value]}>
              {number.translation}
            </Translation>
            <ExampleSentence onClick={(e) => {
              e.stopPropagation();
              playSound(number.example);
            }}>
              {number.example}
            </ExampleSentence>
            <ExampleTranslation show={showTranslations[number.value]}>
              {number.exampleTranslation}
            </ExampleTranslation>
          </NumberCard>
        ))}
      </NumbersGrid>
    </Container>
  );
};

export default NumbersPage; 