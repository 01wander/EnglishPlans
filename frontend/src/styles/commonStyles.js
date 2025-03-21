import styled from 'styled-components';
import { theme } from './theme';

// 布局组件
export const Container = styled.div`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.md};
  max-width: ${theme.container.maxWidth};
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: ${theme.typography.fontSize.xxxl};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

export const Description = styled.p`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

// 网格布局
export const Grid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

// 卡片组件
export const Card = styled.div`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.md};
  }
`;

// 图标容器
export const IconContainer = styled.div`
  font-size: ${theme.typography.fontSize.emoji};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  transition: ${theme.transitions.default};
`;

// 文本组件
export const Text = styled.div.attrs(props => ({
  size: props.size || 'md',
  weight: props.weight || 'normal',
  color: props.color || 'primary'
}))`
  font-size: ${props => theme.typography.fontSize[props.size]};
  font-weight: ${props => theme.typography.fontWeight[props.weight]};
  color: ${props => 
    props.color === 'primary' 
      ? theme.colors.text.primary 
      : props.color === 'secondary' 
        ? theme.colors.text.secondary 
        : theme.colors.text.light
  };
`;

// 按钮组件
export const Button = styled.button.attrs(props => ({
  variant: props.variant || 'default',
  primary: props.primary || false
}))`
  background: ${props => 
    props.primary 
      ? theme.colors.primary 
      : props.variant === 'text' 
        ? 'transparent'
        : theme.colors.background.primary
  };
  color: ${props => 
    props.primary 
      ? theme.colors.background.primary 
      : theme.colors.text.secondary
  };
  border: ${props => 
    props.variant === 'text' 
      ? 'none' 
      : `1px solid ${theme.colors.border.default}`
  };
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: ${theme.transitions.default};
  min-width: 80px;

  &:hover {
    background: ${props => 
      props.primary 
        ? theme.colors.primaryDark
        : props.variant === 'text'
          ? 'transparent'
          : theme.colors.background.hover
    };
    color: ${props => 
      props.primary 
        ? theme.colors.background.primary
        : theme.colors.primary
    };
  }
`;

// 动画容器
export const AnimatedContainer = styled.div`
  height: ${props => props.show ? 'auto' : '0'};
  opacity: ${props => props.show ? 1 : 0};
  overflow: hidden;
  transition: ${theme.transitions.default};
`;

// 示例句子组件
export const ExampleSentenceBase = styled.div`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text.light};
  font-style: italic;
  cursor: pointer;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  line-height: ${theme.typography.lineHeight.relaxed};
  transition: ${theme.transitions.default};
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

// 翻译按钮基础组件
export const TranslationButtonBase = styled(Button)`
  margin: ${theme.spacing.sm} auto;
  display: block;
`;

// 标签组件
export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xxl};
  flex-wrap: wrap;
`;

export const Tab = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.pill};
  background-color: ${props => props.active ? theme.colors.background.tab.active : theme.colors.background.tab.inactive};
  color: ${props => props.active ? '#fff' : theme.colors.text.primary};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.md};
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${props => props.active ? theme.colors.background.tab.hoverActive : theme.colors.background.tab.hoverInactive};
  }
`;

// 翻译按钮
export const TranslationButton = styled(Button)`
  margin: ${theme.spacing.md} auto;
  font-size: ${theme.typography.fontSize.xs};
`; 