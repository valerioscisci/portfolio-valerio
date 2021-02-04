import React from 'react';
import styled, { css } from 'styled-components';

export interface StyledLinkProps {
  color?: string;
  href: string;
  target?: string;
  onHoverSpacing?: boolean;
  style?: React.CSSProperties;
}

export const StyledLink: React.FC<StyledLinkProps> = ({
  color,
  href,
  target,
  onHoverSpacing = true,
  style,
  ...props
}) => {
  return (
    <Container
      href={href}
      color={color}
      rel={'noreferrer'}
      target={target}
      onHoverSpacing={onHoverSpacing}
      style={style}
    >
      {props.children}
    </Container>
  );
};

const Container = styled.a<{ color?: string; onHoverSpacing?: boolean }>`
  color: ${(props) =>
    props.color === 'white'
      ? props.theme.colors.textColorWhite
      : props.theme.colors.textColorBlack};
  font-family: Corben;
  font-size: 1em;
  word-spacing: 0.15em;
  letter-spacing: 0.02em;
  margin: 0;
  text-decoration: none;
  transition: letter-spacing 0.1s ease-out;
  &:hover,
  &:focus,
  &:active {
    @media (min-width: 576px) {
      color: ${(props) => props.theme.colors.primary};
      ${(props) =>
        props.onHoverSpacing &&
        css`
          letter-spacing: 0.15em;
        `}
    }
  }
`;
