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
  TranslationButtonBase
} from './commonStyles';

// 继承通用样式组件
export { Container, PageTitle, Description };

export const NumbersGrid = styled(Grid)``;

export const NumberCard = styled(Card)`
  text-align: center;
  min-height: 250px;
  
  &:hover {
    background-color: ${theme.colors.background.hover};
  }
`;

export const NumberEmoji = styled(IconContainer)``;

export const NumberValue = styled(Text).attrs({
  size: 'xxl',
  weight: 'bold',
  color: 'primary'
})`
  margin-bottom: ${theme.spacing.sm};
`;

export const NumberWord = styled(Text).attrs({
  size: 'lg',
  color: 'secondary'
})`
  margin-bottom: ${theme.spacing.sm};
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