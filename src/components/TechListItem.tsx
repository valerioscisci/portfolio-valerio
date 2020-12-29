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
  transform: translateY(-50%);

  ${(props) => {
    const moveElementCss: any = () => {
      switch (true) {
        case props.animationState === 0:
          return css`
            left: -1em;
            top: 0%;
            opacity: 0;
            width: 0em;
          `;
        case props.animationState === 1:
          return css`
            left: 1em;
            top: 15%;
            opacity: 0.5;
            width: 3em;
          `;
        case props.animationState === 2:
          return css`
            left: 1em;
            top: 50%;
            opacity: 1;
            width: 5em;

            @media (min-width: 768px) {
              left: 50%;
            }
          `;
        case props.animationState === 3:
          return css`
            left: 1em;
            top: 85%;
            opacity: 0.5;
            width: 3em;
          `;
        case props.animationState === 4:
          return css`
            left: -1em;
            top: 100%;
            opacity: 0;
            width: 0em;
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
