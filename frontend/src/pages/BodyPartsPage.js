import React, { useState } from 'react';
import {
  Container,
  PageTitle,
  Description,
  CategoryTabs,
  CategoryTab,
  PartsGrid,
  PartCard,
  PartEmoji,
  PartName,
  PartNameChinese,
  TranslationButton,
  ExampleSentence,
  ExampleTranslation
} from '../styles/BodyPartsStyles';
import { FaStar, FaRegStar, FaCheck } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';
import ScrollToTop from '../components/ScrollToTop';

const bodyParts = {
  face: [
    { id: 'eyes', emoji: "👀", english: "Eyes", chinese: "眼睛", example: "I can see with my eyes.", exampleTranslation: "我用眼睛看东西。" },
    { id: 'nose', emoji: "👃", english: "Nose", chinese: "鼻子", example: "I smell with my nose.", exampleTranslation: "我用鼻子闻东西。" },
    { id: 'mouth', emoji: "👄", english: "Mouth", chinese: "嘴巴", example: "I eat with my mouth.", exampleTranslation: "我用嘴巴吃东西。" },
    { id: 'ears', emoji: "👂", english: "Ears", chinese: "耳朵", example: "I hear with my ears.", exampleTranslation: "我用耳朵听声音。" },
    { id: 'tongue', emoji: "👅", english: "Tongue", chinese: "舌头", example: "I taste with my tongue.", exampleTranslation: "我用舌头品尝。" },
    { id: 'teeth', emoji: "🦷", english: "Teeth", chinese: "牙齿", example: "I brush my teeth.", exampleTranslation: "我刷牙。" },
    { id: 'eye', emoji: "👁️", english: "Eye", chinese: "眼睛", example: "My eye is blue.", exampleTranslation: "我的眼睛是蓝色的。" },
    { id: 'brain', emoji: "🧠", english: "Brain", chinese: "大脑", example: "I think with my brain.", exampleTranslation: "我用大脑思考。" }
  ],
  body: [
    { id: 'arm', emoji: "💪", english: "Arm", chinese: "手臂", example: "I lift with my arm.", exampleTranslation: "我用手臂举东西。" },
    { id: 'leg', emoji: "🦿", english: "Leg", chinese: "腿", example: "I run with my legs.", exampleTranslation: "我用腿跑步。" },
    { id: 'foot', emoji: "🦶", english: "Foot", chinese: "脚", example: "I walk on my feet.", exampleTranslation: "我用脚走路。" },
    { id: 'hand', emoji: "🤚", english: "Hand", chinese: "手", example: "I write with my hand.", exampleTranslation: "我用手写字。" },
    { id: 'finger', emoji: "👈", english: "Finger", chinese: "手指", example: "I point with my finger.", exampleTranslation: "我用手指指点。" },
    { id: 'knee', emoji: "🦵", english: "Knee", chinese: "膝盖", example: "I bend my knee.", exampleTranslation: "我弯曲膝盖。" },
    { id: 'lungs', emoji: "🫁", english: "Lungs", chinese: "肺", example: "I breathe with my lungs.", exampleTranslation: "我用肺呼吸。" },
    { id: 'heart', emoji: "❤️", english: "Heart", chinese: "心脏", example: "My heart beats.", exampleTranslation: "我的心脏在跳动。" }
  ],
  actions: [
    { id: 'running', emoji: "🏃", english: "Running", chinese: "跑步", example: "I am running fast.", exampleTranslation: "我跑得很快。" },
    { id: 'waving', emoji: "👋", english: "Waving", chinese: "挥手", example: "I wave goodbye.", exampleTranslation: "我挥手说再见。" },
    { id: 'clapping', emoji: "👏", english: "Clapping", chinese: "鼓掌", example: "I clap my hands.", exampleTranslation: "我鼓掌。" },
    { id: 'shaking-hands', emoji: "🤝", english: "Shaking hands", chinese: "握手", example: "Nice to meet you.", exampleTranslation: "很高兴见到你。" },
    { id: 'thumbs-up', emoji: "👍", english: "Thumbs up", chinese: "竖起大拇指", example: "Good job!", exampleTranslation: "做得好！" },
    { id: 'raising-hand', emoji: "🙋", english: "Raising hand", chinese: "举手", example: "I know the answer!", exampleTranslation: "我知道答案！" },
    { id: 'hugging', emoji: "🤗", english: "Hugging", chinese: "拥抱", example: "I hug my friend.", exampleTranslation: "我拥抱我的朋友。" },
    { id: 'thinking', emoji: "🤔", english: "Thinking", chinese: "思考", example: "I am thinking hard.", exampleTranslation: "我在认真思考。" }
  ]
};

const BodyPartsPage = () => {
  const [activeCategory, setActiveCategory] = useState('face');
  const [showTranslations, setShowTranslations] = useState({});
  const { audioSettings, favorites, toggleFavorite, progress, updateProgress } = useUser();
  
  const toggleTranslation = (partId) => {
    setShowTranslations(prev => ({
      ...prev,
      [partId]: !prev[partId]
    }));
  };
  
  const playSound = (text) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.volume = audioSettings.volume;
    utterance.rate = audioSettings.rate;
    utterance.pitch = audioSettings.pitch;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = (part) => {
    playSound(part.english);
    if (!progress.bodyParts[part.id]) {
      updateProgress('bodyParts', part.id, 'started');
    }
  };

  const markAsCompleted = (e, partId) => {
    e.stopPropagation();
    updateProgress('bodyParts', partId, 'completed');
  };

  return (
    <Container>
      <PageTitle>身体部位 Body Parts</PageTitle>
      <Description>点击卡片听发音，包含示例句</Description>
      
      <CategoryTabs>
        <CategoryTab 
          active={activeCategory === 'face'} 
          onClick={() => setActiveCategory('face')}
        >
          👀 脸部 Face
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'body'} 
          onClick={() => setActiveCategory('body')}
        >
          💪 身体 Body
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'actions'} 
          onClick={() => setActiveCategory('actions')}
        >
          🏃 动作 Actions
        </CategoryTab>
      </CategoryTabs>
      
      <PartsGrid>
        {bodyParts[activeCategory].map((part) => (
          <PartCard key={part.id} onClick={() => handleCardClick(part)}>
            <PartEmoji>{part.emoji}</PartEmoji>
            <PartName>{part.english}</PartName>
            <PartNameChinese>{part.chinese}</PartNameChinese>
            
            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px' }}>
              {progress.bodyParts[part.id] === 'completed' ? (
                <FaCheck style={{ color: '#4CAF50' }} />
              ) : (
                <FaCheck
                  style={{ color: '#ccc', cursor: 'pointer' }}
                  onClick={(e) => markAsCompleted(e, part.id)}
                />
              )}
              {favorites.bodyParts.includes(part.id) ? (
                <FaStar
                  style={{ color: '#FFD700', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('bodyParts', part.id);
                  }}
                />
              ) : (
                <FaRegStar
                  style={{ color: '#666', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('bodyParts', part.id);
                  }}
                />
              )}
            </div>
            
            <TranslationButton 
              onClick={(e) => {
                e.stopPropagation();
                toggleTranslation(part.id);
              }}
            >
              显示翻译
            </TranslationButton>
            <ExampleSentence onClick={(e) => {
              e.stopPropagation();
              playSound(part.example);
            }}>
              {part.example}
            </ExampleSentence>
            <ExampleTranslation show={showTranslations[part.id]}>
              {part.exampleTranslation}
            </ExampleTranslation>
          </PartCard>
        ))}
      </PartsGrid>
      
      <ScrollToTop />
    </Container>
  );
};

export default BodyPartsPage; 