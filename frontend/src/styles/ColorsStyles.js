import styled from 'styled-components';
import { theme } from './theme';
import {
  Container,
  PageTitle,
  Description,
  Grid,
  Card,
  Text,
  AnimatedContainer,
  ExampleSentenceBase,
  TranslationButtonBase
} from './commonStyles';

// 继承通用样式组件
export { Container, PageTitle, Description };

export const ColorsGrid = styled(Grid)``;

export const ColorCard = styled(Card)`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
`;

export const ColorDisplay = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  font-size: ${theme.typography.fontSize.emoji};
  transition: ${theme.transitions.default};

  ${ColorCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ColorInfo = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const ColorName = styled(Text).attrs({
  size: 'xl',
  weight: 'bold',
  color: 'primary'
})`
  margin-bottom: ${theme.spacing.xs};
`;

export const ColorChinese = styled(Text).attrs({
  size: 'md',
  color: 'secondary'
})`
  margin-bottom: ${theme.spacing.lg};
`;

export const TranslationButton = styled(TranslationButtonBase)``;

export const Translation = styled(AnimatedContainer)`
  margin: ${theme.spacing.xs} 0;
`;

export const ExampleSentence = styled(ExampleSentenceBase)`
  margin-top: auto;
`;

export const ExampleTranslation = styled(AnimatedContainer)`
  font-style: italic;
  padding: 0 ${theme.spacing.sm};
`; 