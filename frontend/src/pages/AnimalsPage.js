import React, { useState } from 'react';
import { Howl } from 'howler';
import {
  Container,
  PageTitle,
  Description,
  CategoryTabs,
  CategoryTab,
  AnimalsGrid,
  AnimalCard,
  AnimalEmoji,
  AnimalInfo,
  AnimalName,
  AnimalNameChinese,
  TranslationButton,
  Translation,
  ExampleSentence,
  ExampleTranslation,
  AnimalSound,
  SoundTranslation,
  ModalOverlay,
  ModalContent,
  ModalEmoji,
  ModalTitle,
  ModalDescription,
  SoundButton,
  CloseButton
} from '../styles/AnimalsStyles';
import ScrollToTop from '../components/ScrollToTop';

const animals = {
  pets: [
    { emoji: "🐶", english: "Dog", chinese: "狗", example: "I have a pet dog.", exampleTranslation: "我有一只宠物狗。" },
    { emoji: "🐱", english: "Cat", chinese: "猫", example: "The cat is sleeping.", exampleTranslation: "猫在睡觉。" },
    { emoji: "🐰", english: "Rabbit", chinese: "兔子", example: "My rabbit likes carrots.", exampleTranslation: "我的兔子喜欢胡萝卜。" },
    { emoji: "🐹", english: "Hamster", chinese: "仓鼠", example: "The hamster is running in its wheel.", exampleTranslation: "仓鼠在跑轮子。" },
    { emoji: "🐦", english: "Bird", chinese: "鸟", example: "The bird is singing.", exampleTranslation: "鸟在唱歌。" },
    { emoji: "🐠", english: "Fish", chinese: "鱼", example: "I feed my fish every day.", exampleTranslation: "我每天都给鱼喂食。" }
  ],
  farm: [
    { emoji: "🐮", english: "Cow", chinese: "奶牛", example: "The cow gives us milk.", exampleTranslation: "奶牛给我们牛奶。" },
    { emoji: "🐷", english: "Pig", chinese: "猪", example: "The pig is playing in the mud.", exampleTranslation: "猪在泥巴里玩。" },
    { emoji: "🐔", english: "Chicken", chinese: "鸡", example: "The chicken lays eggs.", exampleTranslation: "鸡下蛋。" },
    { emoji: "🐴", english: "Horse", chinese: "马", example: "I like riding horses.", exampleTranslation: "我喜欢骑马。" },
    { emoji: "🐑", english: "Sheep", chinese: "羊", example: "The sheep gives us wool.", exampleTranslation: "羊给我们羊毛。" },
    { emoji: "🦆", english: "Duck", chinese: "鸭子", example: "The duck swims in the pond.", exampleTranslation: "鸭子在池塘里游泳。" }
  ],
  wild: [
    { emoji: "🦁", english: "Lion", chinese: "狮子", example: "The lion is the king of the jungle.", exampleTranslation: "狮子是丛林之王。" },
    { emoji: "🐯", english: "Tiger", chinese: "老虎", example: "The tiger is a powerful animal.", exampleTranslation: "老虎是一种强大的动物。" },
    { emoji: "🐘", english: "Elephant", chinese: "大象", example: "Elephants have long trunks.", exampleTranslation: "大象有长长的鼻子。" },
    { emoji: "🦒", english: "Giraffe", chinese: "长颈鹿", example: "The giraffe has a long neck.", exampleTranslation: "长颈鹿有长脖子。" },
    { emoji: "🐼", english: "Panda", chinese: "熊猫", example: "Pandas eat bamboo.", exampleTranslation: "熊猫吃竹子。" },
    { emoji: "🦊", english: "Fox", chinese: "狐狸", example: "The fox is very clever.", exampleTranslation: "狐狸很聪明。" }
  ],
  ocean: [
    { emoji: "🐋", english: "Whale", chinese: "鲸鱼", example: "The whale is the largest animal.", exampleTranslation: "鲸鱼是最大的动物。" },
    { emoji: "🐬", english: "Dolphin", chinese: "海豚", example: "Dolphins are very friendly.", exampleTranslation: "海豚很友好。" },
    { emoji: "🦈", english: "Shark", chinese: "鲨鱼", example: "The shark swims fast.", exampleTranslation: "鲨鱼游得很快。" },
    { emoji: "🐙", english: "Octopus", chinese: "章鱼", example: "The octopus has eight arms.", exampleTranslation: "章鱼有八条触手。" },
    { emoji: "🦀", english: "Crab", chinese: "螃蟹", example: "The crab walks sideways.", exampleTranslation: "螃蟹横着走。" },
    { emoji: "🐢", english: "Turtle", chinese: "乌龟", example: "The turtle moves slowly.", exampleTranslation: "乌龟走得很慢。" }
  ]
};

const AnimalsPage = () => {
  const [activeCategory, setActiveCategory] = useState('pets');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showTranslations, setShowTranslations] = useState({});
  
  const toggleTranslation = (animalId) => {
    setShowTranslations(prev => ({
      ...prev,
      [animalId]: !prev[animalId]
    }));
  };
  
  const playSound = (text) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  };
  
  const openModal = (animal) => {
    setSelectedAnimal(animal);
    playSound(animal.english);
  };
  
  const closeModal = () => {
    setSelectedAnimal(null);
  };

  return (
    <Container>
      <PageTitle>动物 Animals</PageTitle>
      <Description>点击卡片听发音，包含示例句</Description>
      
      <CategoryTabs>
        <CategoryTab 
          active={activeCategory === 'pets'} 
          onClick={() => setActiveCategory('pets')}
        >
          🐱 宠物 Pets
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'farm'} 
          onClick={() => setActiveCategory('farm')}
        >
          🐮 农场动物 Farm
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'wild'} 
          onClick={() => setActiveCategory('wild')}
        >
          🦁 野生动物 Wild
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'ocean'} 
          onClick={() => setActiveCategory('ocean')}
        >
          🐋 海洋动物 Ocean
        </CategoryTab>
      </CategoryTabs>
      
      <AnimalsGrid>
        {animals[activeCategory].map((animal, index) => (
          <AnimalCard key={index} onClick={() => openModal(animal)}>
            <AnimalEmoji>
              {animal.emoji}
            </AnimalEmoji>
            <AnimalInfo>
              <AnimalName>{animal.english}</AnimalName>
              <AnimalNameChinese>{animal.chinese}</AnimalNameChinese>
              <TranslationButton 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTranslation(animal.english);
                }}
              >
                显示翻译
              </TranslationButton>
              <Translation show={showTranslations[animal.english]}>
                {animal.chinese}
              </Translation>
              <AnimalSound 
                onClick={(e) => {
                  e.stopPropagation();
                  playSound(animal.english);
                }}
              >
                {animal.english}
              </AnimalSound>
              <ExampleSentence onClick={(e) => {
                e.stopPropagation();
                playSound(animal.example);
              }}>
                {animal.example}
              </ExampleSentence>
              <ExampleTranslation show={showTranslations[animal.english]}>
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
              <ModalTitle>{selectedAnimal.english}</ModalTitle>
              <ModalDescription>{selectedAnimal.chinese}</ModalDescription>
              <SoundButton onClick={() => playSound(selectedAnimal.english)}>
                🔊
              </SoundButton>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
      
      <ScrollToTop />
    </Container>
  );
};

export default AnimalsPage; 