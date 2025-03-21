import React from 'react';
import styled from 'styled-components';
import { useUser } from '../contexts/UserContext';
import { theme } from '../styles/theme';

const ControlsContainer = styled.div`
  background-color: ${theme.colors.background.secondary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  width: 80px;
`;

const Slider = styled.input`
  flex: 1;
  margin: 0 ${theme.spacing.md};
`;

const Value = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  width: 50px;
  text-align: right;
`;

const AudioControls = () => {
  const { audioSettings, updateAudioSettings } = useUser();

  const handleChange = (setting, value) => {
    updateAudioSettings({ [setting]: parseFloat(value) });
  };

  return (
    <ControlsContainer>
      <ControlGroup>
        <Label>音量</Label>
        <Slider
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={audioSettings.volume}
          onChange={(e) => handleChange('volume', e.target.value)}
        />
        <Value>{Math.round(audioSettings.volume * 100)}%</Value>
      </ControlGroup>
      
      <ControlGroup>
        <Label>语速</Label>
        <Slider
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={audioSettings.rate}
          onChange={(e) => handleChange('rate', e.target.value)}
        />
        <Value>{audioSettings.rate}x</Value>
      </ControlGroup>
      
      <ControlGroup>
        <Label>音调</Label>
        <Slider
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={audioSettings.pitch}
          onChange={(e) => handleChange('pitch', e.target.value)}
        />
        <Value>{audioSettings.pitch}x</Value>
      </ControlGroup>
    </ControlsContainer>
  );
};

export default AudioControls; 