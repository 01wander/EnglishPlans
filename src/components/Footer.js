import React, { useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
`;

const FooterEmoji = styled.div`
  font-size: 4rem;
  margin-bottom: 10px;
  animation: ${props => props.pop ? 'pop 0.3s ease-out forwards' : 'bounce 2s infinite'};
  cursor: pointer;
  user-select: none;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pop {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(2); opacity: 0; }
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copyright = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: #666;
`;

const Footer = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPoped, setIsPoped] = useState(false);

  const handleBalloonClick = () => {
    if (!isPoped) {
      setIsPoped(true);
      setShowConfetti(true);
      // 播放爆炸音效
      const popSound = new SpeechSynthesisUtterance('Yay! Surprise!');
      popSound.lang = 'en-US';
      popSound.pitch = 1.8;
      popSound.rate = 1.0;
      popSound.volume = 0.8;
      window.speechSynthesis.speak(popSound);
      
      // 3秒后重置气球
      setTimeout(() => {
        setIsPoped(false);
        setShowConfetti(false);
      }, 3000);
    }
  };

  return (
    <FooterContainer>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      <FooterEmoji onClick={handleBalloonClick} pop={isPoped}>
        {isPoped ? '💥' : '🎈'}
      </FooterEmoji>
      <FooterContent>
        <Copyright>© {new Date().getFullYear()} 趣味英语乐园 - 为一年级小朋友设计</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 