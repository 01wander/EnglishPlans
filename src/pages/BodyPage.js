import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScrollToTop from '../components/ScrollToTop';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const Description = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 4px 12px rgba(33, 150, 243, 0.3)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const PartCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PartEmoji = styled.span`
  font-size: 2.5rem;
  margin-right: 15px;
`;

const TextContent = styled.div`
  flex-grow: 1;
`;

const English = styled.p`
  font-size: 1.15rem;
  color: #333;
  margin: 0;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f8ff;
    color: #2196f3;
  }
`;

const Chinese = styled.p`
  font-size: 1.05rem;
  color: #666;
  margin: 5px 0 0 0;
  display: block;
  font-weight: 500;
`;

const ExampleSection = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const ExampleEnglish = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
  font-style: italic;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f8ff;
    color: #2196f3;
  }
`;

const ExampleChinese = styled.p`
  font-size: 0.95rem;
  color: #777;
  margin: 5px 0;
  display: block;
  font-weight: 500;
`;

const PlayIcon = styled.span`
  font-size: 1.2rem;
  color: #2196f3;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const categories = {
  head: [
    {
      english: "Eyes",
      chinese: "眼睛",
      emoji: "👁️",
      example: {
        english: "I can see with my eyes.",
        chinese: "我用眼睛看东西。"
      }
    },
    {
      english: "Nose",
      chinese: "鼻子",
      emoji: "👃",
      example: {
        english: "I smell with my nose.",
        chinese: "我用鼻子闻气味。"
      }
    },
    {
      english: "Mouth",
      chinese: "嘴巴",
      emoji: "👄",
      example: {
        english: "I eat with my mouth.",
        chinese: "我用嘴巴吃东西。"
      }
    },
    {
      english: "Ears",
      chinese: "耳朵",
      emoji: "👂",
      example: {
        english: "I hear with my ears.",
        chinese: "我用耳朵听声音。"
      }
    },
    {
      english: "Hair",
      chinese: "头发",
      emoji: "💇",
      example: {
        english: "She has long hair.",
        chinese: "她有很长的头发。"
      }
    },
    {
      english: "Teeth",
      chinese: "牙齿",
      emoji: "🦷",
      example: {
        english: "Brush your teeth twice a day.",
        chinese: "每天刷牙两次。"
      }
    }
  ],
  body: [
    {
      english: "Arms",
      chinese: "手臂",
      emoji: "💪",
      example: {
        english: "I exercise my arms every day.",
        chinese: "我每天锻炼手臂。"
      }
    },
    {
      english: "Legs",
      chinese: "腿",
      emoji: "🦵",
      example: {
        english: "My legs are tired from running.",
        chinese: "我跑步跑得腿都累了。"
      }
    },
    {
      english: "Chest",
      chinese: "胸部",
      emoji: "👕",
      example: {
        english: "Take a deep breath and expand your chest.",
        chinese: "深呼吸，挺起你的胸部。"
      }
    },
    {
      english: "Back",
      chinese: "背部",
      emoji: "🔙",
      example: {
        english: "I have back pain.",
        chinese: "我背痛。"
      }
    },
    {
      english: "Stomach",
      chinese: "肚子",
      emoji: "🤰",
      example: {
        english: "My stomach hurts after eating too much.",
        chinese: "吃太多后我肚子疼。"
      }
    },
    {
      english: "Shoulder",
      chinese: "肩膀",
      emoji: "🙋",
      example: {
        english: "Put your hand on my shoulder.",
        chinese: "把你的手放在我的肩膀上。"
      }
    }
  ],
  actions: [
    {
      english: "Running",
      chinese: "跑步",
      emoji: "🏃",
      example: {
        english: "I am running fast.",
        chinese: "我跑得很快。"
      }
    },
    {
      english: "Waving",
      chinese: "挥手",
      emoji: "👋",
      example: {
        english: "I wave goodbye.",
        chinese: "我挥手说再见。"
      }
    },
    {
      english: "Clapping",
      chinese: "鼓掌",
      emoji: "👏",
      example: {
        english: "I clap my hands.",
        chinese: "我鼓掌。"
      }
    },
    {
      english: "Shaking hands",
      chinese: "握手",
      emoji: "🤝",
      example: {
        english: "Nice to meet you.",
        chinese: "很高兴见到你。"
      }
    },
    {
      english: "Jumping",
      chinese: "跳跃",
      emoji: "🤸",
      example: {
        english: "Children like jumping.",
        chinese: "孩子们喜欢跳跃。"
      }
    },
    {
      english: "Dancing",
      chinese: "跳舞",
      emoji: "💃",
      example: {
        english: "She is dancing beautifully.",
        chinese: "她跳舞跳得很美。"
      }
    }
  ]
};

const BodyPage = () => {
  const [activeCategory, setActiveCategory] = useState('actions');
  
  const playSound = (text) => {
    console.log("Playing sound:", text);
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Forcing re-render to ensure Chinese text displays");
      setActiveCategory(activeCategory);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <PageTitle>身体部位 Body Parts</PageTitle>
      <Description>
        点击<span style={{color: '#2196f3', fontWeight: 'bold'}}>蓝色单词</span>或例句可以听发音
      </Description>
      
      <CategoryTabs>
        <Tab 
          active={activeCategory === 'head'} 
          onClick={() => setActiveCategory('head')}
        >
          脸部 Face
        </Tab>
        <Tab 
          active={activeCategory === 'body'} 
          onClick={() => setActiveCategory('body')}
        >
          身体 Body
        </Tab>
        <Tab 
          active={activeCategory === 'actions'} 
          onClick={() => setActiveCategory('actions')}
        >
          动作 Actions
        </Tab>
      </CategoryTabs>
      
      <PartsGrid>
        {categories[activeCategory].map((part, index) => (
          <PartCard key={index}>
            <CardHeader>
              <PartEmoji>{part.emoji}</PartEmoji>
              <TextContent>
                <English onClick={() => playSound(part.english)}>
                  {part.english}
                </English>
                <Chinese>{part.chinese || "中文翻译"}</Chinese>
              </TextContent>
              <PlayIcon onClick={() => playSound(part.english)}>
                🔊
              </PlayIcon>
            </CardHeader>
            
            <ExampleSection>
              <ExampleEnglish onClick={() => playSound(part.example.english)}>
                {part.example.english}
              </ExampleEnglish>
              <ExampleChinese>{part.example.chinese || part.chinese + "的例句"}</ExampleChinese>
            </ExampleSection>
          </PartCard>
        ))}
      </PartsGrid>

      <ScrollToTop />
    </Container>
  );
};

export default BodyPage; 