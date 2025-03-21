import styled from 'styled-components';
import { theme } from './theme';
import {
  Container,
  PageTitle,
  Description,
  Grid,
  Card,
  IconContainer,
  Text,
  Button,
  AnimatedContainer,
  ExampleSentenceBase,
  TranslationButtonBase,
  Tabs,
  Tab
} from './commonStyles';

// 继承通用样式组件
export { Container, PageTitle, Description };

export const CategoryTabs = styled(Tabs)``;

export const CategoryTab = styled(Tab)``;

export const AnimalsGrid = styled(Grid)`
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

export const AnimalCard = styled(Card)`
  min-height: 350px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const AnimalEmoji = styled(IconContainer)`
  ${AnimalCard}:hover & {
    transform: scale(1.1);
  }
`;

export const AnimalName = styled(Text).attrs({
  size: 'xl',
  weight: 'semibold'
})`
  margin-bottom: ${theme.spacing.sm};
`;

export const AnimalNameChinese = styled(Text).attrs({
  size: 'md',
  color: 'secondary'
})`
  margin-bottom: ${theme.spacing.lg};
`;

export const TranslationButton = styled(Button)``;

export const ExampleSentence = styled.div`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.light};
  font-style: italic;
  cursor: pointer;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-top: auto;
  position: relative;
  
  &:hover {
    background-color: ${theme.colors.background.hover};
    color: ${theme.colors.secondary};
  }

  &::before {
    content: '🔊';
    position: absolute;
    right: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    font-size: ${theme.typography.fontSize.md};
    opacity: 0;
    transition: ${theme.transitions.default};
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const ExampleTranslation = styled(AnimatedContainer)`
  font-style: italic;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
  background-color: ${theme.colors.background.hover};
  border-radius: ${theme.borderRadius.sm};
  margin-top: ${theme.spacing.sm};
`;

export const AnimalInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  width: 100%;
`;

export const AnimalChinese = styled(Text).attrs({
  size: 'md',
  color: 'secondary'
})`
  margin-bottom: ${theme.spacing.lg};
`;

export const SoundText = styled(Text).attrs({
  size: 'lg',
  color: 'primary'
})`
  margin: ${theme.spacing.md} 0;
  font-style: italic;
`;

export const Translation = styled(AnimatedContainer)`
  margin: ${theme.spacing.xs} 0;
`;

export const AnimalSound = styled.div`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.light};
  font-style: italic;
  cursor: pointer;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  
  &:hover {
    background-color: ${theme.colors.background.hover};
  }
`;

export const SoundTranslation = styled(AnimatedContainer)`
  font-style: italic;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
`;

export const ModalContent = styled.div`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: ${theme.shadows.lg};
  position: relative;
`;

export const ModalEmoji = styled.div`
  font-size: ${theme.typography.fontSize.xxxl};
  margin-bottom: ${theme.spacing.lg};
`;

export const ModalTitle = styled(Text).attrs({
  size: 'xxl',
  weight: 'bold',
  color: 'primary'
})`
  margin-bottom: ${theme.spacing.sm};
`;

export const ModalDescription = styled(Text).attrs({
  size: 'lg',
  color: 'secondary'
})`
  margin-bottom: ${theme.spacing.lg};
`;

export const SoundButton = styled(Button).attrs({
  primary: true
})`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.xl};
  margin: ${theme.spacing.md} auto;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const CloseButton = styled(Button).attrs({
  variant: 'text'
})`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.lg};
  padding: ${theme.spacing.xs};
  min-width: auto;
  color: ${theme.colors.text.secondary};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`; 