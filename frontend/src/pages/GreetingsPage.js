import React, { useState } from 'react';
import styled from 'styled-components';
import ScrollToTop from '../components/ScrollToTop';
import { FaLanguage } from 'react-icons/fa';

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

const PhrasesGrid = styled.div`
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

const PhraseCard = styled.div`
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

const English = styled.p`
  font-size: 1.15rem;
  color: #333;
  margin: 0;
  flex-grow: 1;
`;

const Chinese = styled.p`
  font-size: 1.05rem;
  color: #666;
  margin: 0;
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
`;

const ExampleChinese = styled.p`
  font-size: 0.95rem;
  color: #777;
  margin: 5px 0;
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

const TranslateButton = styled.button`
  color: #3498db;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 6px 12px;
  border-radius: 6px;
  margin-left: 10px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  white-space: nowrap;

  &:hover {
    color: #2980b9;
    background-color: #e9ecef;
  }
`;

const TranslateIcon = styled(FaLanguage)`
  color: #3498db;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;
  margin-left: 10px;
  background-color: #f8f9fa;

  &:hover {
    color: #2980b9;
    transform: scale(1.1);
    background-color: #e9ecef;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  color: #2c3e50;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 5px 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  color: #2c3e50;
  background-color: white;
  cursor: pointer;
`;

const categories = {
  greetings: {
    name: '问候语',
    phrases: [
      { 
        english: 'Hello!', 
        chinese: '你好！', 
        example: 'Hello, how are you today?',
        exampleChinese: '你好，今天怎么样？'
      },
      { 
        english: 'Good morning!', 
        chinese: '早上好！', 
        example: 'Good morning! Did you sleep well?',
        exampleChinese: '早上好！睡得好吗？'
      },
      { 
        english: 'Good afternoon!', 
        chinese: '下午好！', 
        example: 'Good afternoon! Nice weather today!',
        exampleChinese: '下午好！今天天气真好！'
      },
      { 
        english: 'Good evening!', 
        chinese: '晚上好！', 
        example: 'Good evening! Have you had dinner?',
        exampleChinese: '晚上好！吃过晚饭了吗？'
      },
      { 
        english: 'How are you?', 
        chinese: '你好吗？', 
        example: 'Hi Tom, how are you?',
        exampleChinese: '嗨，汤姆，你好吗？'
      },
      { 
        english: "I'm fine, thank you!", 
        chinese: '我很好，谢谢！', 
        example: "I'm fine, thank you! And you?",
        exampleChinese: '我很好，谢谢！你呢？'
      }
    ]
  },
  thanks: {
    name: '感谢语',
    phrases: [
      { 
        english: 'Thank you!', 
        chinese: '谢谢！', 
        example: 'Thank you for your help!',
        exampleChinese: '谢谢你的帮助！'
      },
      { 
        english: "You're welcome!", 
        chinese: '不客气！', 
        example: "You're welcome! Happy to help!",
        exampleChinese: '不客气！很高兴能帮上忙！'
      },
      { 
        english: 'Thank you very much!', 
        chinese: '非常感谢！', 
        example: 'Thank you very much for everything!',
        exampleChinese: '非常感谢你做的一切！'
      },
      { 
        english: 'Thanks a lot!', 
        chinese: '多谢！', 
        example: 'Thanks a lot for the birthday gift!',
        exampleChinese: '生日礼物太感谢了！'
      },
      { 
        english: 'No problem!', 
        chinese: '没问题！', 
        example: 'No problem! Let me know if you need more help.',
        exampleChinese: '没问题！如果需要更多帮助请告诉我。'
      },
      { 
        english: 'My pleasure!', 
        chinese: '我很荣幸！', 
        example: 'My pleasure! I enjoyed helping you!',
        exampleChinese: '这是我的荣幸！很高兴能帮到你！'
      }
    ]
  },
  basic: {
    name: '基本对话',
    phrases: [
      { 
        english: 'What is your name?', 
        chinese: '你叫什么名字？', 
        example: 'Hi, what is your name?',
        exampleChinese: '嗨，你叫什么名字？'
      },
      { 
        english: 'My name is...', 
        chinese: '我的名字是...', 
        example: 'My name is John Smith.',
        exampleChinese: '我的名字是约翰·史密斯。'
      },
      { 
        english: 'Nice to meet you!', 
        chinese: '很高兴见到你！', 
        example: 'Nice to meet you, Sarah!',
        exampleChinese: '很高兴见到你，莎拉！'
      },
      { 
        english: 'Where are you from?', 
        chinese: '你来自哪里？', 
        example: 'Where are you from originally?',
        exampleChinese: '你是哪里人？'
      },
      { 
        english: 'I am from...', 
        chinese: '我来自...', 
        example: 'I am from New York.',
        exampleChinese: '我来自纽约。'
      },
      { 
        english: 'See you later!', 
        chinese: '待会见！', 
        example: 'See you later at the meeting!',
        exampleChinese: '会议上见！'
      }
    ]
  },
  school: {
    name: '学校用语',
    phrases: [
      { 
        english: 'May I ask a question?', 
        chinese: '我可以问一个问题吗？', 
        example: 'Excuse me, may I ask a question about this?',
        exampleChinese: '对不起，我可以问一下这个问题吗？'
      },
      { 
        english: "I don't understand.", 
        chinese: '我不明白。', 
        example: "Sorry, I don't understand this part.",
        exampleChinese: '抱歉，我不明白这部分。'
      },
      { 
        english: 'Could you repeat that?', 
        chinese: '您能重复一遍吗？', 
        example: 'Could you repeat that more slowly?',
        exampleChinese: '您能说慢一点重复一遍吗？'
      },
      { 
        english: 'What does this mean?', 
        chinese: '这是什么意思？', 
        example: 'What does this word mean?',
        exampleChinese: '这个词是什么意思？'
      },
      { 
        english: 'How do you say...?', 
        chinese: '...怎么说？', 
        example: 'How do you say "apple" in Chinese?',
        exampleChinese: '"苹果"用英语怎么说？'
      },
      { 
        english: 'I understand now.', 
        chinese: '我现在明白了。', 
        example: 'Oh, I understand now. Thank you!',
        exampleChinese: '哦，我现在明白了。谢谢！'
      }
    ]
  },
  daily: {
    name: '日常生活',
    phrases: [
      { 
        english: 'What time is it?', 
        chinese: '现在几点了？', 
        example: 'Excuse me, what time is it now?',
        exampleChinese: '对不起，现在几点了？'
      },
      { 
        english: 'I like this.', 
        chinese: '我喜欢这个。', 
        example: 'I like this movie very much!',
        exampleChinese: '我非常喜欢这部电影！'
      },
      { 
        english: 'How much is it?', 
        chinese: '这个多少钱？', 
        example: 'How much is this book?',
        exampleChinese: '这本书多少钱？'
      },
      { 
        english: 'I need help.', 
        chinese: '我需要帮助。', 
        example: 'Excuse me, I need help with directions.',
        exampleChinese: '对不起，我需要问路。'
      },
      { 
        english: 'Can you help me?', 
        chinese: '你能帮我吗？', 
        example: 'Can you help me carry this bag?',
        exampleChinese: '你能帮我拿这个包吗？'
      },
      { 
        english: 'Of course!', 
        chinese: '当然可以！', 
        example: "Of course! I'd be happy to help!",
        exampleChinese: '当然可以！我很乐意帮忙！'
      }
    ]
  }
};

const GreetingsPage = () => {
  const [activeCategory, setActiveCategory] = useState('greetings');
  const [speed, setSpeed] = useState('0.8');
  const [pitch, setPitch] = useState('1');
  const [showTranslations, setShowTranslations] = useState({});

  const playSound = (text) => {
    // 取消所有正在播放的语音
    window.speechSynthesis.cancel();

    // 创建新的语音实例
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 移除句子末尾的标点符号，以改善语音效果
    const cleanText = text.replace(/[!?.,]$/, '');
    utterance.text = cleanText;
    
    utterance.lang = 'en-US';
    utterance.rate = parseFloat(speed);
    utterance.pitch = parseFloat(pitch);
    utterance.volume = 1;

    // 播放语音
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('语音播放失败:', error);
    }
  };

  const toggleTranslation = (index) => {
    setShowTranslations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Container>
      <PageTitle>日常用语 Daily Expressions</PageTitle>
      <Description>
        学习常用英语表达和对话。点击句子可以听发音！
        <br />
        Learn common English expressions and dialogues. Click on sentences to hear pronunciation!
      </Description>
      
      <Controls>
        <Control>
          <Label>语速 Speed:</Label>
          <Select value={speed} onChange={(e) => setSpeed(e.target.value)}>
            <option value="0.6">慢速 Slow</option>
            <option value="0.8">中速 Normal</option>
            <option value="1">快速 Fast</option>
          </Select>
        </Control>
        <Control>
          <Label>音调 Pitch:</Label>
          <Select value={pitch} onChange={(e) => setPitch(e.target.value)}>
            <option value="0.8">低音 Low</option>
            <option value="1">中音 Normal</option>
            <option value="1.2">高音 High</option>
          </Select>
        </Control>
      </Controls>

      <CategoryTabs>
        {Object.entries(categories).map(([key, category]) => (
          <Tab
            key={key}
            active={activeCategory === key}
            onClick={() => setActiveCategory(key)}
          >
            {category.name}
          </Tab>
        ))}
      </CategoryTabs>

      <PhrasesGrid>
        {categories[activeCategory].phrases.map((phrase, index) => (
          <PhraseCard key={index}>
            <CardHeader>
              <English 
                onClick={() => playSound(phrase.english)}
                role="button"
                tabIndex={0}
              >
                {phrase.english}
              </English>
              <TranslateButton 
                onClick={() => toggleTranslation(index)}
                title="点击查看翻译"
              >
                翻译
              </TranslateButton>
            </CardHeader>
            <Chinese show={showTranslations[index]}>
              {phrase.chinese}
            </Chinese>
            <ExampleSection>
              <ExampleEnglish 
                onClick={() => playSound(phrase.example)}
                role="button"
                tabIndex={0}
              >
                {phrase.example}
              </ExampleEnglish>
              <ExampleChinese show={showTranslations[index]}>
                {phrase.exampleChinese}
              </ExampleChinese>
            </ExampleSection>
          </PhraseCard>
        ))}
      </PhrasesGrid>

      <ScrollToTop />
    </Container>
  );
};

export default GreetingsPage; 