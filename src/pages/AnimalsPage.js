import React, { useState } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
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

const AnimalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
`;

const AnimalCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 350px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const AnimalImage = styled.div`
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const AnimalInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const AnimalName = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
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
  margin: 5px auto;
  width: fit-content;

  &:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
  }
`;

const Translation = styled.div`
  font-size: 1.2rem;
  color: #666;
  opacity: ${props => props.show ? 1 : 0};
  height: ${props => props.show ? 'auto' : '0'};
  transition: all 0.3s ease;
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
  opacity: ${props => props.show ? 1 : 0};
  height: ${props => props.show ? 'auto' : '0'};
  transition: all 0.3s ease;
  margin: 5px 0;
`;

const AnimalSound = styled.div`
  font-size: 1.1rem;
  color: #888;
  font-style: italic;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SoundTranslation = styled.div`
  font-size: 1rem;
  color: #666;
  opacity: ${props => props.show ? 1 : 0};
  height: ${props => props.show ? 'auto' : '0'};
  transition: all 0.3s ease;
`;

const ModalOverlay = styled.div`
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
  padding: 30px;
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const ModalEmoji = styled.div`
  font-size: 8rem;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 2.5rem;
  color: #ff6347;
  margin-bottom: 10px;
`;

const ModalDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
`;

const SoundButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  
  &:hover {
    background-color: #ff4500;
    transform: scale(1.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #ff6347;
  }
`;

const AnimalsPage = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showTranslations, setShowTranslations] = useState({});
  
  const animals = [
    {
      name: 'Cat',
      translation: '猫',
      emoji: '🐱',
      sound: 'meow',
      soundTranslation: '喵喵',
      example: 'The cat sleeps on the bed.',
      exampleTranslation: '猫在床上睡觉。'
    },
    {
      name: 'Dog',
      translation: '狗',
      emoji: '🐶',
      sound: 'woof',
      soundTranslation: '汪汪',
      example: 'The dog plays in the garden.',
      exampleTranslation: '狗在花园里玩耍。'
    },
    {
      name: 'Elephant',
      translation: '大象',
      emoji: '🐘',
      sound: 'trumpet',
      soundTranslation: '啊噜',
      example: 'The elephant is very big.',
      exampleTranslation: '大象非常大。'
    },
    {
      name: 'Lion',
      translation: '狮子',
      emoji: '🦁',
      sound: 'roar',
      soundTranslation: '吼吼',
      example: 'The lion is the king of animals.',
      exampleTranslation: '狮子是动物之王。'
    },
    {
      name: 'Monkey',
      translation: '猴子',
      emoji: '🐒',
      sound: 'chatter',
      soundTranslation: '吱吱',
      example: 'The monkey likes bananas.',
      exampleTranslation: '猴子喜欢香蕉。'
    },
    {
      name: 'Bird',
      translation: '小鸟',
      emoji: '🐦',
      sound: 'chirp',
      soundTranslation: '啾啾',
      example: 'The bird flies in the sky.',
      exampleTranslation: '小鸟在天空飞翔。'
    },
    {
      name: 'Fish',
      translation: '鱼',
      emoji: '🐠',
      sound: 'bubble',
      soundTranslation: '咕噜咕噜',
      example: 'The fish swims in the water.',
      exampleTranslation: '鱼在水里游泳。'
    },
    {
      name: 'Rabbit',
      translation: '兔子',
      emoji: '🐰',
      sound: 'squeak',
      soundTranslation: '吱吱',
      example: 'The rabbit eats carrots.',
      exampleTranslation: '兔子吃胡萝卜。'
    },
    {
      name: 'Snake',
      translation: '蛇',
      emoji: '🐍',
      sound: 'hiss',
      soundTranslation: '嘶嘶',
      example: 'The snake moves quietly.',
      exampleTranslation: '蛇安静地移动。'
    },
    {
      name: 'Tiger',
      translation: '老虎',
      emoji: '🐯',
      sound: 'growl',
      soundTranslation: '嗷呜',
      example: 'The tiger runs fast.',
      exampleTranslation: '老虎跑得很快。'
    },
    {
      name: 'Panda',
      translation: '熊猫',
      emoji: '🐼',
      sound: 'grunt',
      soundTranslation: '哼哼',
      example: 'The panda eats bamboo.',
      exampleTranslation: '熊猫吃竹子。'
    },
    {
      name: 'Giraffe',
      translation: '长颈鹿',
      emoji: '🦒',
      sound: 'hum',
      soundTranslation: '哼哼',
      example: 'The giraffe has a long neck.',
      exampleTranslation: '长颈鹿有一个长脖子。'
    }
  ];
  
  const playAnimalSound = (animalName) => {
    const sound = new Howl({
      src: [`/sounds/animals/${animalName.toLowerCase()}.mp3`],
      volume: 1.0
    });
    sound.play();
  };
  
  const openModal = (animal) => {
    setSelectedAnimal(animal);
    playAnimalSound(animal.name);
  };
  
  const closeModal = () => {
    setSelectedAnimal(null);
  };
  
  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };
  
  const toggleTranslation = (animalName) => {
    setShowTranslations(prev => ({
      ...prev,
      [animalName]: !prev[animalName]
    }));
  };
  
  return (
    <Container>
      <PageTitle>英语动物</PageTitle>
      <Description>
        点击动物卡片，学习常见动物的英语名称和发音。
        每种动物都有对应的中文翻译、拟声词和例句！
      </Description>
      
      <AnimalsGrid>
        {animals.map((animal) => (
          <AnimalCard 
            key={animal.name}
            onClick={() => playSound(animal.name)}
          >
            <AnimalImage>
              {animal.emoji}
            </AnimalImage>
            <AnimalInfo>
              <AnimalName>{animal.name}</AnimalName>
              <TranslationButton 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTranslation(animal.name);
                }}
              >
                {showTranslations[animal.name] ? '隐藏翻译' : '显示翻译'}
              </TranslationButton>
              <Translation show={showTranslations[animal.name]}>
                {animal.translation}
              </Translation>
              <AnimalSound 
                onClick={(e) => {
                  e.stopPropagation();
                  playSound(animal.sound);
                }}
              >
                {animal.sound}
              </AnimalSound>
              <SoundTranslation show={showTranslations[animal.name]}>
                {animal.soundTranslation}
              </SoundTranslation>
              <ExampleSentence 
                onClick={(e) => {
                  e.stopPropagation();
                  playSound(animal.example);
                }}
              >
                {animal.example}
              </ExampleSentence>
              <ExampleTranslation show={showTranslations[animal.name]}>
                {animal.exampleTranslation}
              </ExampleTranslation>
            </AnimalInfo>
          </AnimalCard>
        ))}
      </AnimalsGrid>
      
      <ModalOverlay show={selectedAnimal !== null} onClick={closeModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          {selectedAnimal && (
            <>
              <CloseButton onClick={closeModal}>✕</CloseButton>
              <ModalEmoji>{selectedAnimal.emoji}</ModalEmoji>
              <ModalTitle>{selectedAnimal.name}</ModalTitle>
              <ModalDescription>{selectedAnimal.description}</ModalDescription>
              <SoundButton onClick={() => playAnimalSound(selectedAnimal.name)}>
                🔊
              </SoundButton>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default AnimalsPage; 