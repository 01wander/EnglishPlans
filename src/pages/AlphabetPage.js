import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
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

const LetterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 25px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LetterCard = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Letter = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: #ff6347;
  margin-bottom: 15px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const WordImage = styled.div`
  font-size: 4rem;
  transition: transform 0.2s;
  margin-bottom: 10px;
`;

const WordText = styled.div`
  font-size: 2rem;
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
  margin: 10px auto;
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

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
`;

const ExampleSentence = styled.div`
  font-size: 1.3rem;
  color: #888;
  font-style: italic;
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 10px;
  line-height: 1.4;
  
  &:hover {
    background-color: #fff3f0;
  }
`;

const AlphabetPage = () => {
  const [showTranslations, setShowTranslations] = useState({});

  const toggleTranslation = (letterId) => {
    setShowTranslations(prev => ({
      ...prev,
      [letterId]: !prev[letterId]
    }));
  };

  const letters = [
    { letter: 'A', word: 'Apple', emoji: '🍎', translation: '苹果', example: 'An apple a day keeps the doctor away.', exampleTranslation: '一天一苹果，医生远离我。' },
    { letter: 'B', word: 'Banana', emoji: '🍌', translation: '香蕉', example: 'The monkey loves bananas.', exampleTranslation: '猴子喜欢香蕉。' },
    { letter: 'C', word: 'Cat', emoji: '🐱', translation: '猫', example: 'The cat is sleeping.', exampleTranslation: '猫在睡觉。' },
    { letter: 'D', word: 'Dog', emoji: '🐶', translation: '狗', example: 'The dog is playing.', exampleTranslation: '狗在玩耍。' },
    { letter: 'E', word: 'Elephant', emoji: '🐘', translation: '大象', example: 'The elephant is big.', exampleTranslation: '大象很大。' },
    { letter: 'F', word: 'Fish', emoji: '🐠', translation: '鱼', example: 'Fish swim in the sea.', exampleTranslation: '鱼在海里游。' },
    { letter: 'G', word: 'Giraffe', emoji: '🦒', translation: '长颈鹿', example: 'The giraffe has a long neck.', exampleTranslation: '长颈鹿有长脖子。' },
    { letter: 'H', word: 'Horse', emoji: '🐎', translation: '马', example: 'The horse runs fast.', exampleTranslation: '马跑得快。' },
    { letter: 'I', word: 'Ice cream', emoji: '🍦', translation: '冰淇淋', example: 'I love ice cream.', exampleTranslation: '我喜欢冰淇淋。' },
    { letter: 'J', word: 'Jellyfish', emoji: '🎐', translation: '水母', example: 'The jellyfish glows.', exampleTranslation: '水母会发光。' },
    { letter: 'K', word: 'Kangaroo', emoji: '🦘', translation: '袋鼠', example: 'Kangaroos hop.', exampleTranslation: '袋鼠蹦蹦跳跳。' },
    { letter: 'L', word: 'Lion', emoji: '🦁', translation: '狮子', example: 'The lion is the king.', exampleTranslation: '狮子是王者。' },
    { letter: 'M', word: 'Monkey', emoji: '🐒', translation: '猴子', example: 'The monkey climbs trees.', exampleTranslation: '猴子爬树。' },
    { letter: 'N', word: 'Nest', emoji: '🪹', translation: '鸟巢', example: 'Birds build nests.', exampleTranslation: '鸟儿筑巢。' },
    { letter: 'O', word: 'Orange', emoji: '🍊', translation: '橙子', example: 'The orange is sweet.', exampleTranslation: '橙子很甜。' },
    { letter: 'P', word: 'Panda', emoji: '🐼', translation: '熊猫', example: 'Pandas eat bamboo.', exampleTranslation: '熊猫吃竹子。' },
    { letter: 'Q', word: 'Queen', emoji: '👑', translation: '女王', example: 'The queen wears a crown.', exampleTranslation: '女王戴着皇冠。' },
    { letter: 'R', word: 'Rabbit', emoji: '🐰', translation: '兔子', example: 'The rabbit hops.', exampleTranslation: '兔子蹦跳。' },
    { letter: 'S', word: 'Sun', emoji: '☀️', translation: '太阳', example: 'The sun is bright.', exampleTranslation: '太阳很明亮。' },
    { letter: 'T', word: 'Tiger', emoji: '🐯', translation: '老虎', example: 'The tiger is fierce.', exampleTranslation: '老虎很凶猛。' },
    { letter: 'U', word: 'Umbrella', emoji: '☔', translation: '雨伞', example: 'Use an umbrella when it rains.', exampleTranslation: '下雨时使用雨伞。' },
    { letter: 'V', word: 'Violin', emoji: '🎻', translation: '小提琴', example: 'She plays the violin.', exampleTranslation: '她演奏小提琴。' },
    { letter: 'W', word: 'Whale', emoji: '🐳', translation: '鲸鱼', example: 'The whale swims.', exampleTranslation: '鲸鱼在游泳。' },
    { letter: 'X', word: 'Fox', emoji: '🦊', translation: '狐狸', example: 'The fox is clever.', exampleTranslation: '狐狸很聪明。' },
    { letter: 'Y', word: 'Yoyo', emoji: '🪀', translation: '悠悠球', example: 'The yoyo spins.', exampleTranslation: '悠悠球在转动。' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓', translation: '斑马', example: 'The zebra has stripes.', exampleTranslation: '斑马有条纹。' }
  ];

  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <Title>英语字母</Title>
      <Description>
        点击字母卡片，学习英语字母A-Z。
        每个字母都有对应的单词、表情符号、中文翻译和例句！
      </Description>
      
      <LetterGrid>
        {letters.map((item) => (
          <LetterCard key={item.letter}>
            <Letter onClick={() => playSound(item.letter)}>
              {item.letter}
            </Letter>
            <WordContainer onClick={() => playSound(item.word)}>
              <WordImage>{item.emoji}</WordImage>
              <WordText>{item.word}</WordText>
            </WordContainer>
            <TranslationButton 
              onClick={() => toggleTranslation(item.letter)}
            >
              显示翻译
            </TranslationButton>
            <Translation show={showTranslations[item.letter]}>
              {item.translation}
            </Translation>
            <ExampleContainer>
              <ExampleSentence onClick={() => playSound(item.example)}>
                {item.example}
              </ExampleSentence>
              <Translation show={showTranslations[item.letter]}>
                {item.exampleTranslation}
              </Translation>
            </ExampleContainer>
          </LetterCard>
        ))}
      </LetterGrid>
    </Container>
  );
};

export default AlphabetPage; 