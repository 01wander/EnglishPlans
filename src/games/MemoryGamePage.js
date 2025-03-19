import React, { useState, useEffect, useCallback } from 'react';
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

const Difficulty = styled.div`
  display: flex;
  align-items: center;
`;

const DifficultyLabel = styled.span`
  font-size: 1.2rem;
  color: #666;
  margin-right: 15px;
`;

const DifficultyButton = styled.button`
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

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-gap: 15px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;

const CardFront = styled(CardFace)`
  background-color: #feb47b;
  color: white;
`;

const CardBack = styled(CardFace)`
  background-color: white;
  transform: rotateY(180deg);
  font-size: 3.5rem;
`;

const GameOverModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
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

const MemoryGamePage = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [gridSize, setGridSize] = useState({ rows: 3, columns: 4 });
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // 生成卡片
  const generateCards = (difficulty) => {
    let pairs = [];
    let newGridSize;
    
    switch(difficulty) {
      case 'easy':
        pairs = [
          {value: 'apple', emoji: '🍎'},
          {value: 'banana', emoji: '🍌'},
          {value: 'cat', emoji: '🐱'},
          {value: 'dog', emoji: '🐶'},
          {value: 'elephant', emoji: '🐘'},
          {value: 'fish', emoji: '🐠'}
        ];
        newGridSize = { rows: 3, columns: 4 };
        break;
      case 'medium':
        pairs = [
          {value: 'apple', emoji: '🍎'},
          {value: 'banana', emoji: '🍌'},
          {value: 'cat', emoji: '🐱'},
          {value: 'dog', emoji: '🐶'},
          {value: 'elephant', emoji: '🐘'},
          {value: 'fish', emoji: '🐠'},
          {value: 'giraffe', emoji: '🦒'},
          {value: 'horse', emoji: '🐴'}
        ];
        newGridSize = { rows: 4, columns: 4 };
        break;
      case 'hard':
        pairs = [
          {value: 'apple', emoji: '🍎'},
          {value: 'banana', emoji: '🍌'},
          {value: 'cat', emoji: '🐱'},
          {value: 'dog', emoji: '🐶'},
          {value: 'elephant', emoji: '🐘'},
          {value: 'fish', emoji: '🐠'},
          {value: 'giraffe', emoji: '🦒'},
          {value: 'horse', emoji: '🐴'},
          {value: 'ice', emoji: '🧊'},
          {value: 'jellyfish', emoji: '🪼'}
        ];
        newGridSize = { rows: 4, columns: 5 };
        break;
      default:
        pairs = [
          {value: 'apple', emoji: '🍎'},
          {value: 'banana', emoji: '🍌'},
          {value: 'cat', emoji: '🐱'},
          {value: 'dog', emoji: '🐶'},
          {value: 'elephant', emoji: '🐘'},
          {value: 'fish', emoji: '🐠'}
        ];
        newGridSize = { rows: 3, columns: 4 };
    }
    
    // 创建卡片对
    let newCards = [];
    pairs.forEach((item, index) => {
      newCards.push({
        id: index * 2,
        value: item.value,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false
      });
      newCards.push({
        id: index * 2 + 1,
        value: item.value,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // 洗牌
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    
    setCards(newCards);
    setGridSize(newGridSize);
  };
  
  // 使用useCallback包装startNewGame函数，避免不必要的重新创建
  const startNewGame = useCallback(() => {
    generateCards(difficulty);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsGameOver(false);
    setShowConfetti(false);
  }, [difficulty]);
  
  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, [startNewGame]); // 现在依赖于startNewGame
  
  const handleCardClick = (id) => {
    // 如果已经翻了两张牌或者点击的卡片已经匹配了或者已经翻开了，则不做任何操作
    if (
      flippedCards.length === 2 ||
      cards.find(card => card.id === id).isMatched ||
      flippedCards.includes(id)
    ) {
      return;
    }
    
    // 播放单词发音
    const card = cards.find(card => card.id === id);
    const utterance = new SpeechSynthesisUtterance(card.value);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    
    // 翻转卡片
    const newCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    
    // 添加到已翻转卡片数组
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // 如果翻了两张牌，则检查是否匹配
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      // 获取两张翻开的卡片
      const firstCard = cards.find(card => card.id === newFlippedCards[0]);
      const secondCard = cards.find(card => card.id === newFlippedCards[1]);
      
      // 检查是否匹配
      if (firstCard.value === secondCard.value) {
        // 匹配成功的音效
        const successSound = new SpeechSynthesisUtterance('Correct!');
        successSound.lang = 'en-US';
        successSound.pitch = 1.5;
        successSound.rate = 1.0;
        window.speechSynthesis.speak(successSound);
        
        // 更新卡片状态
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          ));
          
          // 增加匹配对数
          const newMatchedPairs = matchedPairs + 1;
          setMatchedPairs(newMatchedPairs);
          
          // 检查游戏是否结束
          if (newMatchedPairs === cards.length / 2) {
            setIsGameOver(true);
            setShowConfetti(true);
            
            // 胜利音效
            const winSound = new SpeechSynthesisUtterance('Congratulations! You win the game!');
            winSound.lang = 'en-US';
            winSound.pitch = 1.2;
            winSound.rate = 1.0;
            window.speechSynthesis.speak(winSound);
          }
          
          // 重置翻转卡片
          setFlippedCards([]);
        }, 500);
      } else {
        // 不匹配音效
        const failSound = new SpeechSynthesisUtterance('Try again');
        failSound.lang = 'en-US';
        failSound.pitch = 0.7;
        failSound.rate = 0.8;
        window.speechSynthesis.speak(failSound);
        
        // 一秒后将两张卡片翻回去
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  return (
    <Container>
      <PageTitle>记忆配对游戏</PageTitle>
      <Description>
        翻转卡片，找到相同表情符号的配对！训练记忆力和单词认知能力。
      </Description>
      
      <GameControls>
        <Difficulty>
          <DifficultyLabel>难度：</DifficultyLabel>
          <DifficultyButton 
            isActive={difficulty === 'easy'} 
            onClick={() => setDifficulty('easy')}
          >
            简单
          </DifficultyButton>
          <DifficultyButton 
            isActive={difficulty === 'medium'} 
            onClick={() => setDifficulty('medium')}
          >
            中等
          </DifficultyButton>
          <DifficultyButton 
            isActive={difficulty === 'hard'} 
            onClick={() => setDifficulty('hard')}
          >
            困难
          </DifficultyButton>
        </Difficulty>
        
        <ScoreDisplay>
          步数：<Score>{moves}</Score>
        </ScoreDisplay>
      </GameControls>
      
      <GameBoard columns={gridSize.columns}>
        {cards.map(card => (
          <Card key={card.id} onClick={() => handleCardClick(card.id)}>
            <CardInner isFlipped={card.isFlipped || card.isMatched}>
              <CardFront>?</CardFront>
              <CardBack>
                {card.emoji}
              </CardBack>
            </CardInner>
          </Card>
        ))}
      </GameBoard>
      
      {isGameOver && (
        <GameOverModal>
          <ModalContent>
            <ModalTitle>恭喜你！</ModalTitle>
            <ModalText>
              你用了 <strong>{moves}</strong> 步完成了游戏！
            </ModalText>
            <PlayAgainButton onClick={startNewGame}>
              再玩一次
            </PlayAgainButton>
          </ModalContent>
        </GameOverModal>
      )}
      
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </Container>
  );
};

export default MemoryGamePage; 