import React from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  buttonText: string;
  iconRight?: JSX.Element;
  iconLeft?: JSX.Element;
  arrowAnimation?: boolean;
  style?: React.CSSProperties;
  onClickUrl?: string;
  onClickUrlNewPage?: boolean;
  gradientBackground?: boolean;
  disabled?: boolean;
  type?: string;
}

export const Button: React.FC<ButtonProps> = ({
  buttonText,
  iconRight,
  iconLeft,
  arrowAnimation,
  style,
  onClickUrl,
  onClickUrlNewPage,
  gradientBackground,
  disabled = false,
  type,
}) => {
  return (
    <Container
      as={Container}
      arrowAnimation={arrowAnimation}
      style={style}
      href={onClickUrl}
      target={onClickUrlNewPage ? '_blank' : '_self'}
      rel={'noreferrer'}
      gradientBackground={gradientBackground}
      type={type}
      disabled={disabled}
    >
      {iconLeft && (
        <IconSpan margin={'right'} className={'icon-right'}>
          {iconLeft}
        </IconSpan>
      )}
      {buttonText}
      {iconRight && (
        <IconSpan margin={'left'} className={'icon-left'}>
          {iconRight}
        </IconSpan>
      )}
    </Container>
  );
};

const Container = styled.a<{
  arrowAnimation?: boolean;
  gradientBackground?: boolean;
  disabled?: boolean;
}>`
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
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  padding: 0.4em 1.4em;
  margin: auto;
  border-radius: 0.3em;
  font-family: Manrope;
  font-size: 1em;
  text-decoration: none;
  text-transform: uppercase;
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.textColorGrey
      : props.theme.colors.backgroundDark};
  background: ${(props) => props.theme.colors.background};
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.backgroundDark};
  font-weight: bold;
  transition: all 0.3s ease;

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
    border: 1px solid ${(props) => props.theme.colors.backgroundDark};
    transition: all 0.3s ease;
    z-index: 2;
  }

  ${(props) =>
    props.gradientBackground
      ? css`
          background-image: linear-gradient(
            to right,
            ${(props) => props.theme.colors.primary} 0%,
            ${(props) => props.theme.colors.secondary} 51%,
            ${(props) => props.theme.colors.primary} 100%
          );
          background-size: 200% auto;

          ${!props.disabled &&
          css`
            &:hover {
              background-position: right center;
              text-decoration: none;

              ${() => {
                return (
                  props.arrowAnimation &&
                  '& span.icon-right {transform: rotate(360deg);} & span.icon-left {transform: rotate(-360deg);}'
                );
              }}
            }
          `}
        `
      : css`
          ${!props.disabled &&
          css`
            &:hover {
              color: ${(props) => props.theme.colors.primary};
              background: rgba(34, 40, 49, 0.7);
              &:before {
                -webkit-animation: buttonHover 0.5s ease;
                -moz-animation: buttonHover 0.5s ease;
                -o-animation: buttonHover 0.5s ease;
                animation: buttonHover 0.5s ease;
              }
              ${() => {
                return (
                  props.arrowAnimation &&
                  '& span {transform: translateX(0.8em);}'
                );
              }}
            }
          `}
        `}
`;

const IconSpan = styled.span<{ margin: 'right' | 'left' }>`
  ${(props) => {
    return props.margin === 'right'
      ? css`
          margin-right: 0.5em;
        `
      : css`
          margin-left: 0.5em;
        `;
  }}
  transition: all 0.3s ease-out;
  height: 1em;
`;
