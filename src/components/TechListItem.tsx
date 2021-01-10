import React from 'react';
import styled, { css } from 'styled-components';

export interface TechListItemProps {
  image: string;
  imageAlt: string;
  animationState: number;
}

export const TechListItem: React.FC<TechListItemProps> = ({
  image,
  imageAlt,
  animationState,
}) => {
  return (
    <Container animationState={animationState}>
      <TechLogo src={image} alt={imageAlt} />
    </Container>
  );
};

const Container = styled.li<{
  animationState: number;
}>`
  position: absolute;
  list-style: none;
  height: auto;
  transition: all 0.3s ease-out;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;

  @media (min-width: 768px) {
    transform: translateY(-50%);
  }

  ${(props) => {
    const moveElementCss: any = () => {
      switch (true) {
        case props.animationState === 0:
          return css`
            left: 0%;
            opacity: 0;
            width: 0em;

            @media (min-width: 768px) {
              left: -1em;
              top: 0%;
            }
          `;
        case props.animationState === 1:
          return css`
            left: 20%;
            opacity: 0.5;
            width: 3em;

            @media (min-width: 768px) {
              left: 1em;
              top: 15%;
            }
          `;
        case props.animationState === 2:
          return css`
            opacity: 1;
            width: 5em;
            left: 50%;

            @media (min-width: 768px) {
              left: 50%;
            }
          `;
        case props.animationState === 3:
          return css`
            left: 75%;
            opacity: 0.5;
            width: 3em;

            @media (min-width: 768px) {
              left: 1em;
              top: 85%;
            }
          `;
        case props.animationState === 4:
          return css`
            left: 100%;
            opacity: 0;
            width: 0em;

            @media (min-width: 768px) {
              left: -1em;
              top: 100%;
            }
          `;
      }
    };
    return moveElementCss();
  }}
`;

const TechLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all 0.3s ease-in;
  position: relative;
`;
