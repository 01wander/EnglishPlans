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
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const Description = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 40px;
  font-size: 1.2rem;
`;

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SongCard = styled.div`
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 650px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  }
`;

const SongHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 2px dashed #eee;
`;

const SongEmoji = styled.div`
  font-size: 2.2rem;
  margin-right: 12px;
  background: #f8f9fa;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const SongTitle = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0;
  flex-grow: 1;
`;

const LyricsContainer = styled.div`
  margin-top: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const LyricsSection = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 15px;
  padding-right: 8px;
  padding-bottom: 10px;
  
  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c0d6e4;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #8cb3d9;
  }
`;

const EnglishLyrics = styled.div`
  font-size: 1.15rem;
  color: #34495e;
  line-height: 1.7;
  margin-bottom: 12px;
  white-space: pre-line;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ChineseLyrics = styled.div`
  font-size: 1.05rem;
  color: #7f8c8d;
  line-height: 1.7;
  white-space: pre-line;
  padding-top: 12px;
  border-top: 1px dashed #eee;
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
`;

const PlayButton = styled.button`
  background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1.05rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(33, 150, 243, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PlayIcon = styled.span`
  margin-right: 8px;
  font-size: 1.2rem;
`;

const songs = [
  {
    title: "Twinkle Twinkle Little Star",
    emoji: "⭐",
    english: `Twinkle, twinkle, little star,
How I wonder what you are.
Up above the world so high,
Like a diamond in the sky.
Twinkle, twinkle, little star,
How I wonder what you are.`,
    chinese: `一闪一闪亮晶晶，
满天都是小星星。
挂在天上放光明，
好像许多小眼睛。
一闪一闪亮晶晶，
满天都是小星星。`
  },
  {
    title: "The Wheels on the Bus",
    emoji: "🚌",
    english: `The wheels on the bus go round and round,
Round and round, round and round.
The wheels on the bus go round and round,
All through the town.

The wipers on the bus go swish, swish, swish,
Swish, swish, swish, swish, swish, swish.
The wipers on the bus go swish, swish, swish,
All through the town.`,
    chinese: `车轮滚滚转啊转，
转啊转，转啊转。
车轮滚滚转啊转，
穿过整个城镇。

雨刷器刷来刷去，
刷来刷去，刷来刷去。
雨刷器刷来刷去，
穿过整个城镇。`
  },
  {
    title: "Head, Shoulders, Knees and Toes",
    emoji: "👤",
    english: `Head, shoulders, knees and toes,
Knees and toes.
Head, shoulders, knees and toes,
Knees and toes.
And eyes, and ears, and mouth, and nose.
Head, shoulders, knees and toes,
Knees and toes.`,
    chinese: `头，肩膀，膝盖，脚趾，
膝盖，脚趾。
头，肩膀，膝盖，脚趾，
膝盖，脚趾。
还有眼睛，耳朵，嘴巴和鼻子。
头，肩膀，膝盖，脚趾，
膝盖，脚趾。`
  },
  {
    title: "If You're Happy and You Know It",
    emoji: "👏",
    english: `If you're happy and you know it, clap your hands.
If you're happy and you know it, clap your hands.
If you're happy and you know it, and you really want to show it,
If you're happy and you know it, clap your hands.`,
    chinese: `如果你高兴而且你知道，拍拍手。
如果你高兴而且你知道，拍拍手。
如果你高兴而且你知道，而且你真的想表达，
如果你高兴而且你知道，拍拍手。`
  },
  {
    title: "Old MacDonald Had a Farm",
    emoji: "🐄",
    english: `Old MacDonald had a farm, E-I-E-I-O.
And on his farm he had a cow, E-I-E-I-O.
With a moo-moo here and a moo-moo there,
Here a moo, there a moo, everywhere a moo-moo.
Old MacDonald had a farm, E-I-E-I-O.`,
    chinese: `老麦克唐纳有个农场，咿呀咿呀哦。
在他的农场里有头牛，咿呀咿呀哦。
这儿哞哞，那儿哞哞，
这儿哞，那儿哞，到处都是哞哞。
老麦克唐纳有个农场，咿呀咿呀哦。`
  },
  {
    title: "The Itsy Bitsy Spider",
    emoji: "🕷️",
    english: `The itsy bitsy spider went up the water spout.
Down came the rain and washed the spider out.
Out came the sun and dried up all the rain,
And the itsy bitsy spider went up the spout again.`,
    chinese: `小小蜘蛛爬上水管。
雨水冲下来把蜘蛛冲走了。
太阳出来把雨水晒干，
小小蜘蛛又爬上水管。`
  }
];

const SongsPage = () => {
  const [expandedSong, setExpandedSong] = useState(null);
  
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
      <PageTitle>儿歌童谣 Children's Songs</PageTitle>
      <Description>点击歌曲卡片展开歌词，点击播放按钮听儿歌</Description>
      
      <SongsGrid>
        {songs.map((song, index) => (
          <SongCard key={index}>
            <SongHeader>
              <SongEmoji>{song.emoji}</SongEmoji>
              <SongTitle>{song.title}</SongTitle>
            </SongHeader>
            
            <LyricsContainer>
              <LyricsSection>
                <EnglishLyrics>{song.english}</EnglishLyrics>
                <ChineseLyrics>{song.chinese}</ChineseLyrics>
              </LyricsSection>
              <PlayButton onClick={() => playSound(song.english)}>
                <PlayIcon>▶️</PlayIcon>
                播放 Play
              </PlayButton>
            </LyricsContainer>
          </SongCard>
        ))}
      </SongsGrid>

      <ScrollToTop />
    </Container>
  );
};

export default SongsPage; 