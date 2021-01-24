import React from 'react';
import styled, { css } from 'styled-components';

export interface DotGroupProps {
  slidesNumber: number;
  activeIndex?: number;
  onDotClick: (newActive: number) => void;
}

export const DotGroup: React.FC<DotGroupProps> = ({
  slidesNumber,
  activeIndex = 0,
  onDotClick,
}) => {
  const Dots = [];

  for (let i = 0; i < slidesNumber; i++) {
    Dots.push(
      <Dot key={i}>
        <DotButton
          active={activeIndex === i}
          onClick={() => {
            onDotClick(i);
          }}
        ></DotButton>
      </Dot>,
    );
  }

  return (
    <Container>
      {slidesNumber > 1 &&
        Dots.map((dot) => {
          return dot;
        })}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 3em;
  padding: 0;
  margin: 0;
  z-index: 99;
`;

const Dot = styled.li`
  list-style: none;
`;

const DotButton = styled.button<{ active: boolean }>`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 0 0.7em;
  outline-style: none;
  outline-width: 0;
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  -webkit-box-shadow: 0px 0px 0.5px 3px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 0.5px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 0.5px 3px rgba(0, 0, 0, 0.2);

  -webkit-transition: background-color 0.2s ease-out,
    -webkit-transform 0.3s cubic-bezier(0.8, 1.35, 0.75, 1.45);
  transition: background-color 0.2s ease-out,
    -webkit-transform 0.3s cubic-bezier(0.8, 1.35, 0.75, 1.45);
  transition: transform 0.3s;

  @media (min-width: 1200px) {
    width: 1.2em;
    height: 1.2em;
  }

  ${(props) =>
    props.active
      ? css`
          transform: scale(1.5);
          background-color: ${(props) => props.theme.colors.secondary};

          -webkit-box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
          -moz-box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
          box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
        `
      : css`
          &:hover {
            transform: scale(1.3);
          }
        `};
`;
