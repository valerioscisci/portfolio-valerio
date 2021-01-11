import React from 'react';
import styled, { css } from 'styled-components';

export interface ComingSoonTextProps {
  words: Array<string>;
  position?: { x: number; y: number };
  isActive?: boolean;
}

export const ComingSoonText: React.FC<ComingSoonTextProps> = ({
  words,
  position = { x: 0, y: 0 },
  isActive,
}) => {
  return (
    <Container>
      {words.map((word) => {
        return (
          <ComingSoon
            mouseX={isActive ? position.x : 0}
            mouseY={isActive ? position.y : 0}
            isActive={isActive}
          >
            {word}
          </ComingSoon>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 10em;
  top: 50%;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-100%) rotate(15deg);

  @media (min-width: 576px) {
    transform: translateY(0) rotate(0);
    height: 100%;
    top: 0;
  }
`;

const textShadow = css`
  text-shadow: 0 0 5px ${(props) => props.theme.colors.textColorBlack},
    0 0 10px ${(props) => props.theme.colors.textColorBlack},
    0 0 20px ${(props) => props.theme.colors.secondary},
    0 0 30px ${(props) => props.theme.colors.secondary},
    0 0 40px ${(props) => props.theme.colors.secondary},
    0 0 55px ${(props) => props.theme.colors.secondary},
    0 0 75px ${(props) => props.theme.colors.secondary};
`;

interface ComingSoonProps {
  mouseX?: number;
  mouseY?: number;
  isActive?: boolean;
}

const ComingSoon = styled.span.attrs<ComingSoonProps>((props) => ({
  style: {
    transition: 'transform 0.15s ease',
    transform:
      ' translateY(calc(' +
      props.mouseY +
      'px / -10)) translateX(calc(' +
      props.mouseX +
      'px / -10))',
  },
}))<ComingSoonProps>`
  color: ${(props) => props.theme.colors.textColorBlack};
  font-size: 4em;
  font-weight: 600;
  font-family: Manrope;
  transition: text-shadow 0.3s ease;
  letter-spacing: 0.03em;
  margin: 0 0.1em;
  will-change: transform;

  @media (max-width: 576px) {
    ${textShadow};
  }

  &: hover {
    ${textShadow};
  }
`;
