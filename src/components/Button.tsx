import React from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  buttonText: string;
  iconRight?: JSX.Element;
  iconLeft?: JSX.Element;
  arrowAnimation?: boolean;
  style?: React.CSSProperties;
  onClickUrl?: string;
}

export const Button: React.FC<ButtonProps> = ({
  buttonText,
  iconRight,
  iconLeft,
  arrowAnimation,
  style,
  onClickUrl,
}) => {
  return (
    <Container
      as={Container}
      arrowAnimation={arrowAnimation}
      style={style}
      href={onClickUrl}
      target={'_blank'}
      rel={'noreferrer'}
    >
      {iconLeft && <IconSpan margin={'right'}>{iconLeft}</IconSpan>}
      {buttonText}
      {iconRight && <IconSpan margin={'left'}>{iconRight}</IconSpan>}
    </Container>
  );
};

const Container = styled.a<{ arrowAnimation?: boolean }>`
  @-webkit-keyframes buttonHover {
    0% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
  @-moz-keyframes buttonHover {
    0% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
  @-o-keyframes buttonHover {
    0% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
  @keyframes buttonHover {
    0% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0.4em 1.4em;
  margin: auto;
  border-radius: 0.3em;
  font-family: Manrope;
  font-size: 1em;
  text-decoration: none;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.background};
  background: ${(props) => props.theme.colors.textColorWhite};
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.background};
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: rgba(34, 40, 49, 0.7);
    &:before {
      -webkit-animation: buttonHover 0.5s ease;
      -moz-animation: buttonHover 0.5s ease;
      -o-animation: buttonHover 0.5s ease;
      animation: buttonHover 0.5s ease;
    }
    ${(props) => {
      return props.arrowAnimation && '& span {transform: translateX(0.8em);}';
    }}
  }

  &:focus {
    outline: none;
  }

  &:before {
    position: absolute;
    border-radius: 0.3em;
    content: '';
    opacity: 0;
    left: -0.5em;
    width: 110%;
    height: 120%;
    padding: 1.3em;
    border: 1px solid ${(props) => props.theme.colors.background};
    transition: all 0.3s ease;
    z-index: 2;
  }
`;

const IconSpan = styled.span<{ margin: 'right' | 'left' }>`
  ${(props) => {
    return props.margin === 'right'
      ? css`
          margin-right: 0.3em;
        `
      : css`
          margin-left: 0.3em;
        `;
  }}
  transition: all 0.3s ease-out;
  height: 1em;
`;
