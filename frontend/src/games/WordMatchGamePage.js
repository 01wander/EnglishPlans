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

const GameArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  min-height: 400px;
`;

const WordsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  grid-template-rows: repeat(3, 1fr);
  height: 400px;
`;

const ImagesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  grid-template-rows: repeat(3, 1fr);
  height: 400px;
`;

const WordItem = styled.div`
  background-color: ${props => props.isMatched ? '#e6ffe6' : 'white'};
  border: 2px solid ${props => props.isSelected ? '#ff6347' : props.isMatched ? '#4caf50' : '#ddd'};
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  cursor: ${props => props.isMatched ? 'default' : 'pointer'};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: ${props => props.isMatched ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.isMatched ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  }
`;

const EmojiItem = styled.div`
  background-color: ${props => props.isMatched ? '#e6ffe6' : 'white'};
  border: 2px solid ${props => props.isSelected ? '#ff6347' : props.isMatched ? '#4caf50' : '#ddd'};
  border-radius: 15px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.isMatched ? 'default' : 'pointer'};
  transition: all 0.3s;
  font-size: 4rem;
  
  &:hover {
    transform: ${props => props.isMatched ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.isMatched ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  }
`;

const ResultOverlay = styled.div`
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

const ResultContent = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
`;

const ResultTitle = styled.h2`
  font-size: 2.5rem;
  color: #ff6347;
  margin-bottom: 20px;
`;

const ResultText = styled.p`
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

const WordMatchGamePage = () => {
  const [category, setCategory] = useState('animals');
  const [items, setItems] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // 游戏内容
  const gameItems = {
    animals: [
      { id: 1, word: 'Cat', emoji: '🐱' },
      { id: 2, word: 'Dog', emoji: '🐶' },
      { id: 3, word: 'Elephant', emoji: '🐘' },
      { id: 4, word: 'Lion', emoji: '🦁' },
      { id: 5, word: 'Monkey', emoji: '🐒' },
      { id: 6, word: 'Rabbit', emoji: '🐰' },
      { id: 7, word: 'Bear', emoji: '🐻' },
      { id: 8, word: 'Tiger', emoji: '🐯' },
      { id: 9, word: 'Pig', emoji: '🐷' },
      { id: 10, word: 'Mouse', emoji: '🐭' },
      { id: 11, word: 'Penguin', emoji: '🐧' },
      { id: 12, word: 'Bird', emoji: '🐦' }
    ],
    fruits: [
      { id: 1, word: 'Apple', emoji: '🍎' },
      { id: 2, word: 'Banana', emoji: '🍌' },
      { id: 3, word: 'Orange', emoji: '🍊' },
      { id: 4, word: 'Strawberry', emoji: '🍓' },
      { id: 5, word: 'Watermelon', emoji: '🍉' },
      { id: 6, word: 'Grapes', emoji: '🍇' },
      { id: 7, word: 'Peach', emoji: '🍑' },
      { id: 8, word: 'Pear', emoji: '🍐' },
      { id: 9, word: 'Pineapple', emoji: '🍍' },
      { id: 10, word: 'Cherry', emoji: '🍒' },
      { id: 11, word: 'Mango', emoji: '🥭' },
      { id: 12, word: 'Lemon', emoji: '🍋' }
    ],
    colors: [
      { id: 1, word: 'Red', emoji: '🔴' },
      { id: 2, word: 'Blue', emoji: '🔵' },
      { id: 3, word: 'Green', emoji: '🟢' },
      { id: 4, word: 'Yellow', emoji: '🟡' },
      { id: 5, word: 'Purple', emoji: '🟣' },
      { id: 6, word: 'Orange', emoji: '🟠' },
      { id: 7, word: 'Black', emoji: '⚫' },
      { id: 8, word: 'White', emoji: '⚪' },
      { id: 9, word: 'Brown', emoji: '🟤' }
    ]
  };
  
  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, [category]);
  
  const startNewGame = () => {
    // 从类别中随机选择6个项目
    const allItems = [...gameItems[category]];
    const newItems = [];
    const itemCount = 6;
    
    // 随机选择项目
    while (newItems.length < itemCount) {
      const randomIndex = Math.floor(Math.random() * allItems.length);
      const item = allItems.splice(randomIndex, 1)[0];
      newItems.push(item);
      if (allItems.length === 0) {
        allItems.push(...gameItems[category]);
      }
    }
    
    // 为图片创建一个随机顺序的数组
    const shuffledItems = [...newItems].sort(() => Math.random() - 0.5);
    
    // 将单词和图片的顺序分别存储
    const finalItems = newItems.map((item, index) => ({
      ...item,
      imagePosition: shuffledItems.findIndex(i => i.id === item.id)
    }));
    
    setItems(finalItems);
    setSelectedWord(null);
    setSelectedImage(null);
    setMatchedPairs([]);
    setScore(0);
    setIsGameCompleted(false);
    setShowConfetti(false);
  };
  
  // 播放音效
  const playSound = (type) => {
    let soundFile;
    
    switch(type) {
      case 'match':
        soundFile = new Howl({
          src: ['/sounds/match.mp3'],
          volume: 0.7
        });
        break;
      case 'fail':
        soundFile = new Howl({
          src: ['/sounds/fail.mp3'],
          volume: 0.5
        });
        break;
      case 'win':
        soundFile = new Howl({
          src: ['/sounds/win.mp3'],
          volume: 0.7
        });
        break;
      default:
        return;
    }
    
    soundFile.play();
  };
  
  // 播放单词发音
  const playWordSound = (word) => {
    const sound = new Howl({
      src: [`/sounds/words/${word.toLowerCase()}.mp3`],
      volume: 1.0
    });
    sound.play();
  };
  
  // 处理单词点击
  const handleWordClick = (item) => {
    // 如果已经匹配了，就不做任何操作
    if (matchedPairs.includes(item.id)) {
      return;
    }
    
    // 播放单词发音
    const utterance = new SpeechSynthesisUtterance(item.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    
    // 选中单词
    setSelectedWord(item);
    
    // 如果已经选中了图片，则检查是否匹配
    if (selectedImage) {
      checkMatch(item, selectedImage);
    }
  };
  
  // 处理图片点击
  const handleImageClick = (item) => {
    // 如果已经匹配了，就不做任何操作
    if (matchedPairs.includes(item.id)) {
      return;
    }
    
    // 播放单词发音
    const utterance = new SpeechSynthesisUtterance(item.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    
    // 选中图片
    setSelectedImage(item);
    
    // 如果已经选中了单词，则检查是否匹配
    if (selectedWord) {
      checkMatch(selectedWord, item);
    }
  };
  
  // 检查是否匹配
  const checkMatch = (word, image) => {
    if (word.id === image.id) {
      // 匹配成功
      playSound('match');
      
      // 添加到已匹配数组
      const newMatchedPairs = [...matchedPairs, word.id];
      setMatchedPairs(newMatchedPairs);
      
      // 增加得分
      setScore(score + 10);
      
      // 重置选中状态
      setSelectedWord(null);
      setSelectedImage(null);
      
      // 检查游戏是否完成
      if (newMatchedPairs.length === items.length) {
        setTimeout(() => {
          setIsGameCompleted(true);
          setShowConfetti(true);
          playSound('win');
        }, 500);
      }
    } else {
      // 匹配失败
      playSound('fail');
      
      // 短暂延迟后重置选中状态
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedImage(null);
      }, 1000);
    }
  };
  
  return (
    <Container>
      <PageTitle>单词匹配游戏</PageTitle>
      <Description>
        将左侧的单词与右侧对应的表情符号匹配起来！锻炼单词识别能力。
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
          得分：<Score>{score}</Score>
        </ScoreDisplay>
      </GameControls>
      
      <GameArea>
        <WordsContainer>
          {items.map(item => (
            <WordItem 
              key={`word-${item.id}`}
              isSelected={selectedWord && selectedWord.id === item.id}
              isMatched={matchedPairs.includes(item.id)}
              onClick={() => handleWordClick(item)}
            >
              {item.word}
            </WordItem>
          ))}
        </WordsContainer>
        
        <ImagesContainer>
          {[...items]
            .sort((a, b) => a.imagePosition - b.imagePosition)
            .map(item => (
              <EmojiItem 
                key={`image-${item.id}`}
                isSelected={selectedImage && selectedImage.id === item.id}
                isMatched={matchedPairs.includes(item.id)}
                onClick={() => handleImageClick(item)}
              >
                {item.emoji}
              </EmojiItem>
          ))}
        </ImagesContainer>
      </GameArea>
      
      <ResultOverlay show={isGameCompleted}>
        <ResultContent>
          <ResultTitle>恭喜你！</ResultTitle>
          <ResultText>
            你完成了所有匹配，得分：<strong>{score}</strong>
          </ResultText>
          <PlayAgainButton onClick={startNewGame}>
            再玩一次
          </PlayAgainButton>
        </ResultContent>
      </ResultOverlay>
      
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </Container>
  );
};

export default WordMatchGamePage; 