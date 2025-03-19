import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';
import Confetti from 'react-confetti';

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
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const GameControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const CategorySelect = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryLabel = styled.span`
  font-size: 1.2rem;
  color: #666;
  margin-right: 15px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.isActive ? '#ff6347' : '#f0f0f0'};
  color: ${props => props.isActive ? 'white' : '#666'};
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.isActive ? '#ff6347' : '#e0e0e0'};
  }
`;

const ScoreDisplay = styled.div`
  font-size: 1.2rem;
  color: #666;
  display: flex;
  align-items: center;
`;

const Score = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff6347;
  margin-left: 10px;
`;

const PlayButton = styled.button`
  display: block;
  margin: 0 auto 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ff6347;
  color: white;
  font-size: 2.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  
  &:hover {
    background-color: #ff4500;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  margin-bottom: 30px;
`;

const EmojiCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const EmojiDisplay = styled.div`
  font-size: 4rem;
  margin-bottom: 10px;
`;

const CorrectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(76, 175, 80, 0.3);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 999;
  pointer-events: none;
`;

const CorrectIcon = styled.div`
  font-size: 10rem;
  color: #4caf50;
`;

const IncorrectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 0, 0, 0.2);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 999;
  pointer-events: none;
`;

const IncorrectIcon = styled.div`
  font-size: 10rem;
  color: #f44336;
`;

const GameCompleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
`;

const ModalTitle = styled.h2`
  font-size: 2.5rem;
  color: #ff6347;
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 30px;
`;

const PlayAgainButton = styled.button`
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  background-color: #ff6347;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #ff4500;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ListeningGamePage = () => {
  const [category, setCategory] = useState('animals');
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // 游戏内容
  const gameCategories = {
    animals: [
      { id: 1, name: 'Cat', emoji: '🐱' },
      { id: 2, name: 'Dog', emoji: '🐶' },
      { id: 3, name: 'Elephant', emoji: '🐘' },
      { id: 4, name: 'Lion', emoji: '🦁' },
      { id: 5, name: 'Monkey', emoji: '🐒' },
      { id: 6, name: 'Bird', emoji: '🐦' },
      { id: 7, name: 'Fish', emoji: '🐠' },
      { id: 8, name: 'Rabbit', emoji: '🐰' }
    ],
    fruits: [
      { id: 1, name: 'Apple', emoji: '🍎' },
      { id: 2, name: 'Banana', emoji: '🍌' },
      { id: 3, name: 'Orange', emoji: '🍊' },
      { id: 4, name: 'Strawberry', emoji: '🍓' },
      { id: 5, name: 'Watermelon', emoji: '🍉' },
      { id: 6, name: 'Grapes', emoji: '🍇' },
      { id: 7, name: 'Pineapple', emoji: '🍍' },
      { id: 8, name: 'Peach', emoji: '🍑' }
    ],
    colors: [
      { id: 1, name: 'Red', emoji: '🔴' },
      { id: 2, name: 'Blue', emoji: '🔵' },
      { id: 3, name: 'Green', emoji: '🟢' },
      { id: 4, name: 'Yellow', emoji: '🟡' },
      { id: 5, name: 'Purple', emoji: '🟣' },
      { id: 6, name: 'Orange', emoji: '🟠' },
      { id: 7, name: 'Black', emoji: '⚫' },
      { id: 8, name: 'White', emoji: '⚪' }
    ]
  };
  
  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, [category]);
  
  const startNewGame = () => {
    const items = [...gameCategories[category]];
    setCurrentItems(getRandomItems(items, 4));
    setCurrentItem(null);
    setScore(0);
    setRound(1);
    setGameComplete(false);
    setShowConfetti(false);
  };
  
  // 获取随机项目
  const getRandomItems = (items, count) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  // 开始新的回合
  const startNewRound = () => {
    if (round >= 5) {
      // 游戏结束
      setGameComplete(true);
      setShowConfetti(true);
      // 胜利音效
      const winSound = new Howl({
        src: ['/sounds/win.mp3'],
        volume: 0.7
      });
      winSound.play();
      return;
    }
    
    const items = [...gameCategories[category]];
    setCurrentItems(getRandomItems(items, 4));
    setCurrentItem(null);
    setRound(round + 1);
  };
  
  // 播放单词音效
  const playWordSound = () => {
    if (!currentItem) {
      // 随机选择一个项目
      const randomIndex = Math.floor(Math.random() * currentItems.length);
      const selectedItem = currentItems[randomIndex];
      setCurrentItem(selectedItem);
      
      // 播放单词发音
      const sound = new Howl({
        src: [`/sounds/words/${selectedItem.name.toLowerCase()}.mp3`],
        volume: 1.0
      });
      sound.play();
    } else {
      // 重新播放当前单词
      const sound = new Howl({
        src: [`/sounds/words/${currentItem.name.toLowerCase()}.mp3`],
        volume: 1.0
      });
      sound.play();
    }
  };
  
  // 处理图片点击
  const handleItemClick = (item) => {
    if (!currentItem) return;
    
    if (item.id === currentItem.id) {
      // 答对了
      const correctSound = new Howl({
        src: ['/sounds/correct.mp3'],
        volume: 0.7
      });
      correctSound.play();
      
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
      }, 1000);
      
      setScore(score + 10);
      
      // 下一回合
      setTimeout(() => {
        startNewRound();
      }, 1500);
    } else {
      // 答错了
      const incorrectSound = new Howl({
        src: ['/sounds/incorrect.mp3'],
        volume: 0.7
      });
      incorrectSound.play();
      
      setShowIncorrect(true);
      setTimeout(() => {
        setShowIncorrect(false);
      }, 1000);
    }
  };
  
  return (
    <Container>
      <PageTitle>听力游戏</PageTitle>
      <Description>
        点击播放按钮听单词发音，然后选择正确的表情符号！
        训练你的英语听力和词汇识别能力。
      </Description>
      
      <GameControls>
        <CategorySelect>
          <CategoryLabel>类别：</CategoryLabel>
          <CategoryButton 
            isActive={category === 'animals'} 
            onClick={() => setCategory('animals')}
          >
            动物
          </CategoryButton>
          <CategoryButton 
            isActive={category === 'fruits'} 
            onClick={() => setCategory('fruits')}
          >
            水果
          </CategoryButton>
          <CategoryButton 
            isActive={category === 'colors'} 
            onClick={() => setCategory('colors')}
          >
            颜色
          </CategoryButton>
        </CategorySelect>
        
        <ScoreDisplay>
          得分：<Score>{score}</Score> | 回合：{round}/5
        </ScoreDisplay>
      </GameControls>
      
      <PlayButton onClick={playWordSound}>
        🔊
      </PlayButton>
      
      <EmojiGrid>
        {currentItems.map(item => (
          <EmojiCard 
            key={item.id}
            onClick={() => handleItemClick(item)}
          >
            <EmojiDisplay>{item.emoji}</EmojiDisplay>
          </EmojiCard>
        ))}
      </EmojiGrid>
      
      <CorrectOverlay show={showCorrect}>
        <CorrectIcon>✓</CorrectIcon>
      </CorrectOverlay>
      
      <IncorrectOverlay show={showIncorrect}>
        <IncorrectIcon>✗</IncorrectIcon>
      </IncorrectOverlay>
      
      <GameCompleteModal show={gameComplete}>
        <ModalContent>
          <ModalTitle>游戏结束！</ModalTitle>
          <ModalText>
            你的最终得分：<strong>{score}</strong>
          </ModalText>
          <PlayAgainButton onClick={startNewGame}>
            再玩一次
          </PlayAgainButton>
        </ModalContent>
      </GameCompleteModal>
      
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </Container>
  );
};

export default ListeningGamePage; 