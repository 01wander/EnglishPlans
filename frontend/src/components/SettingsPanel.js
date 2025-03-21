import React from 'react';
import styled from 'styled-components';
import { FaCog, FaTimes } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';
import { theme } from '../styles/theme';

const SettingsButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${theme.colors.background.primary};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${theme.shadows.md};
  z-index: 1000;
  
  &:hover {
    background: ${theme.colors.background.hover};
  }
  
  svg {
    font-size: 20px;
    color: ${theme.colors.text.secondary};
  }
`;

const PanelOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: flex-end;
  z-index: 1000;
`;

const Panel = styled.div`
  background: ${theme.colors.background.primary};
  width: 300px;
  height: 100%;
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  overflow-y: auto;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.text.secondary};
  
  &:hover {
    color: ${theme.colors.text.primary};
  }
  
  svg {
    font-size: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const ControlGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs};
`;

const Slider = styled.input`
  width: 100%;
  margin-bottom: ${theme.spacing.xs};
`;

const Value = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  text-align: right;
`;

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { audioSettings, updateAudioSettings } = useUser();

  const handleChange = (setting, value) => {
    updateAudioSettings({ [setting]: parseFloat(value) });
  };

  return (
    <>
      <SettingsButton onClick={() => setIsOpen(true)}>
        <FaCog />
      </SettingsButton>

      <PanelOverlay isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Panel onClick={e => e.stopPropagation()}>
          <PanelHeader>
            <Title>设置</Title>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FaTimes />
            </CloseButton>
          </PanelHeader>

          <Section>
            <SectionTitle>音频设置</SectionTitle>
            
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
          </Section>
        </Panel>
      </PanelOverlay>
    </>
  );
};

export default SettingsPanel; 