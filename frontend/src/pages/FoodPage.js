import React, { useState } from 'react';
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

const FoodGrid = styled.div`
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

const FoodCard = styled.div`
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

const FoodEmoji = styled.span`
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
`;

const Chinese = styled.p`
  font-size: 1.05rem;
  color: #666;
  margin: 5px 0 0 0;
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

const categories = {
  fruits: [
    {
      english: "Apple",
      chinese: "苹果",
      emoji: "🍎",
      example: {
        english: "I like to eat fresh apples.",
        chinese: "我喜欢吃新鲜的苹果。"
      }
    },
    {
      english: "Banana",
      chinese: "香蕉",
      emoji: "🍌",
      example: {
        english: "Bananas are rich in potassium.",
        chinese: "香蕉富含钾。"
      }
    },
    {
      english: "Orange",
      chinese: "橙子",
      emoji: "🍊",
      example: {
        english: "Orange juice is my favorite drink.",
        chinese: "橙汁是我最喜欢的饮料。"
      }
    },
    {
      english: "Strawberry",
      chinese: "草莓",
      emoji: "🍓",
      example: {
        english: "Strawberries are sweet and juicy.",
        chinese: "草莓又甜又多汁。"
      }
    },
    {
      english: "Watermelon",
      chinese: "西瓜",
      emoji: "🍉",
      example: {
        english: "Watermelon is perfect on a hot day.",
        chinese: "炎热的天气里吃西瓜最棒了。"
      }
    },
    {
      english: "Grape",
      chinese: "葡萄",
      emoji: "🍇",
      example: {
        english: "I bought a bunch of grapes.",
        chinese: "我买了一串葡萄。"
      }
    }
  ],
  vegetables: [
    {
      english: "Carrot",
      chinese: "胡萝卜",
      emoji: "🥕",
      example: {
        english: "Carrots are good for your eyes.",
        chinese: "胡萝卜对眼睛有好处。"
      }
    },
    {
      english: "Broccoli",
      chinese: "西兰花",
      emoji: "🥦",
      example: {
        english: "I love steamed broccoli.",
        chinese: "我喜欢清蒸西兰花。"
      }
    },
    {
      english: "Tomato",
      chinese: "番茄",
      emoji: "🍅",
      example: {
        english: "Tomatoes can be used in many dishes.",
        chinese: "番茄可以用于许多菜肴中。"
      }
    },
    {
      english: "Potato",
      chinese: "土豆",
      emoji: "🥔",
      example: {
        english: "French fries are made from potatoes.",
        chinese: "薯条是由土豆制成的。"
      }
    },
    {
      english: "Cucumber",
      chinese: "黄瓜",
      emoji: "🥒",
      example: {
        english: "Cucumber is refreshing in a salad.",
        chinese: "沙拉中的黄瓜很清爽。"
      }
    },
    {
      english: "Onion",
      chinese: "洋葱",
      emoji: "🧅",
      example: {
        english: "Onions can make you cry when you cut them.",
        chinese: "切洋葱时会让你流泪。"
      }
    }
  ],
  drinks: [
    {
      english: "Water",
      chinese: "水",
      emoji: "💧",
      example: {
        english: "Drink plenty of water every day.",
        chinese: "每天要多喝水。"
      }
    },
    {
      english: "Milk",
      chinese: "牛奶",
      emoji: "🥛",
      example: {
        english: "I drink milk for breakfast.",
        chinese: "我早餐喝牛奶。"
      }
    },
    {
      english: "Coffee",
      chinese: "咖啡",
      emoji: "☕",
      example: {
        english: "I need a coffee to wake up.",
        chinese: "我需要喝杯咖啡来提神。"
      }
    },
    {
      english: "Tea",
      chinese: "茶",
      emoji: "🍵",
      example: {
        english: "Would you like a cup of tea?",
        chinese: "你想来杯茶吗？"
      }
    },
    {
      english: "Juice",
      chinese: "果汁",
      emoji: "🧃",
      example: {
        english: "This juice is made from fresh fruits.",
        chinese: "这个果汁是用新鲜水果制成的。"
      }
    },
    {
      english: "Soda",
      chinese: "汽水",
      emoji: "🥤",
      example: {
        english: "I try not to drink too much soda.",
        chinese: "我尽量不喝太多汽水。"
      }
    }
  ],
  meals: [
    {
      english: "Breakfast",
      chinese: "早餐",
      emoji: "🍳",
      example: {
        english: "Breakfast is the most important meal of the day.",
        chinese: "早餐是一天中最重要的一餐。"
      }
    },
    {
      english: "Sandwich",
      chinese: "三明治",
      emoji: "🥪",
      example: {
        english: "I packed a sandwich for lunch.",
        chinese: "我打包了一个三明治当午餐。"
      }
    },
    {
      english: "Pizza",
      chinese: "披萨",
      emoji: "🍕",
      example: {
        english: "Let's order a pizza for dinner.",
        chinese: "我们点一个披萨当晚餐吧。"
      }
    },
    {
      english: "Hamburger",
      chinese: "汉堡包",
      emoji: "🍔",
      example: {
        english: "This hamburger is delicious.",
        chinese: "这个汉堡包很美味。"
      }
    },
    {
      english: "Spaghetti",
      chinese: "意大利面",
      emoji: "🍝",
      example: {
        english: "I can make spaghetti with tomato sauce.",
        chinese: "我会做番茄酱意大利面。"
      }
    },
    {
      english: "Rice",
      chinese: "米饭",
      emoji: "🍚",
      example: {
        english: "Rice is a staple food in many countries.",
        chinese: "米饭是许多国家的主食。"
      }
    }
  ]
};

const FoodPage = () => {
  const [activeCategory, setActiveCategory] = useState('fruits');
  
  const playSound = (text) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <PageTitle>食物词汇 Food Vocabulary</PageTitle>
      <Description>
        学习常见食物和饮料的英语表达。点击句子可以听发音！
        <br />
        Learn English expressions for common foods and drinks. Click on sentences to hear pronunciation!
      </Description>
      
      <CategoryTabs>
        <Tab 
          active={activeCategory === 'fruits'} 
          onClick={() => setActiveCategory('fruits')}
        >
          水果 Fruits
        </Tab>
        <Tab 
          active={activeCategory === 'vegetables'} 
          onClick={() => setActiveCategory('vegetables')}
        >
          蔬菜 Vegetables
        </Tab>
        <Tab 
          active={activeCategory === 'drinks'} 
          onClick={() => setActiveCategory('drinks')}
        >
          饮品 Drinks
        </Tab>
        <Tab 
          active={activeCategory === 'meals'} 
          onClick={() => setActiveCategory('meals')}
        >
          餐食 Meals
        </Tab>
      </CategoryTabs>
      
      <FoodGrid>
        {categories[activeCategory].map((food, index) => (
          <FoodCard key={index}>
            <CardHeader>
              <FoodEmoji>{food.emoji}</FoodEmoji>
              <TextContent>
                <English onClick={() => playSound(food.english)}>
                  {food.english}
                </English>
                <Chinese>{food.chinese}</Chinese>
              </TextContent>
              <PlayIcon onClick={() => playSound(food.english)}>
                🔊
              </PlayIcon>
            </CardHeader>
            
            <ExampleSection>
              <ExampleEnglish onClick={() => playSound(food.example.english)}>
                {food.example.english}
              </ExampleEnglish>
              <ExampleChinese>{food.example.chinese}</ExampleChinese>
            </ExampleSection>
          </FoodCard>
        ))}
      </FoodGrid>

      <ScrollToTop />
    </Container>
  );
};

export default FoodPage; 