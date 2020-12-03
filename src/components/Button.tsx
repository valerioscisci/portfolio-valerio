import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  buttonText: string;
  iconRight?: JSX.Element;
}

export const Button: React.FC<ButtonProps> = ({ buttonText, iconRight }) => {
  return (
    <Container>
      {buttonText}
      <IconSpan>{iconRight}</IconSpan>
    </Container>
  );
};

const Container = styled.button`
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

  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 0.4em;
  border-radius: 0.3em;
  font-family: Manrope;
  font-size: 1em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.background};
  background: ${(props) => props.theme.colors.textColorWhite};
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.background};
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.primary};
    background: rgba(34, 40, 49, 0.7);
    &:before {
      -webkit-animation: buttonHover 0.5s ease;
      -moz-animation: buttonHover 0.5s ease;
      -o-animation: buttonHover 0.5s ease;
      animation: buttonHover 0.5s ease;
    }
    & span {
      margin-left: 0.8em;
    }
  }

  &:focus {
    outline: none;
  }

  &:before {
    position: absolute;
    border-radius: 0.3em;
    content: '';
    opacity: 0;
    top: -0.3em;
    left: -0.6em;
    width: 110%;
    padding: 1.3em;
    border: 1px solid ${(props) => props.theme.colors.background};
    transition: all 0.3s ease;
  }
`;

const IconSpan = styled.span`
  margin-left: 0.3em;
  transition: all 0.3s ease-out;
  height: 1em;
`;
