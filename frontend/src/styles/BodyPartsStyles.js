import styled from 'styled-components';
import { theme } from './theme';
import { Container, PageTitle, Description, Grid, Card, Button, Tabs, Tab, Text, IconContainer, AnimatedContainer } from './commonStyles';

// 继承通用样式组件
export { Container, PageTitle, Description };

export const CategoryTabs = styled(Tabs)``;

export const CategoryTab = styled(Tab)``;

export const PartsGrid = styled(Grid)`
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

export const PartCard = styled(Card)`
  min-height: 350px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PartEmoji = styled(IconContainer)`
  ${PartCard}:hover & {
    transform: scale(1.1);
  }
`;

export const PartName = styled(Text).attrs({
  size: 'xl',
  weight: 'semibold'
})`
  margin-bottom: ${theme.spacing.sm};
`;

export const PartNameChinese = styled(Text).attrs({
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