import styled from 'styled-components';
import { theme } from './theme';

export const NavContainer = styled.nav`
  background-color: ${theme.colors.background.primary};
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
`;

export const NavContent = styled.div`
  max-width: ${theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  text-decoration: none;
  margin-right: ${theme.spacing.xl};

  span {
    margin-right: ${theme.spacing.sm};
    font-size: 2rem;
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: ${theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  position: relative;
`;

export const NavLink = styled.a`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.background.hover};
  }

  &.active {
    color: ${theme.colors.primary};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  svg {
    font-size: ${theme.typography.fontSize.sm};
    transition: ${theme.transitions.default};
  }

  &:hover svg {
    transform: rotate(180deg);
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
  min-width: 200px;
  padding: ${theme.spacing.sm};
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: ${theme.transitions.default};
  
  ${NavItem}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${theme.colors.background.hover};
    color: ${theme.colors.primary};
  }

  .icon {
    font-size: ${theme.typography.fontSize.xl};
  }

  .text {
    flex: 1;
  }

  .description {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    margin-top: ${theme.spacing.xs};
  }
`; 