import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import AudioControls from '../components/AudioControls';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize.xxl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
`;

const Section = styled.div`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
`;

const Description = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
`;

const AudioSettingsPage = () => {
  return (
    <Container>
      <Title>音频设置</Title>
      <Section>
        <Description>
          调整语音播放的音量、语速和音调，让学习体验更适合你。
        </Description>
        <AudioControls />
      </Section>
    </Container>
  );
};

export default AudioSettingsPage; 