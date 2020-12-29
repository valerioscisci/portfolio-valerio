import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import { useStores } from '../hooks/useStores';
import { TechListItem } from './TechListItem';

export interface TechListProps {
  onTechChange: (newTech: string) => void;
}

export const TechList: React.FC<TechListProps> = observer(
  ({ onTechChange }) => {
    const { home } = useStores();
    const [currentFirstElement, setCurrentFirstElement] = useState<number>(0);

    useEffect(() => {
      onTechChange(home.techMenuImages[currentFirstElement + 2].techName);
    }, [onTechChange, currentFirstElement, home]);

    const handleTechChange = (direction: 'up' | 'down') => {
      const imageIndex = currentFirstElement % home.techMenuImages.length;

      if (direction === 'up') {
        setCurrentFirstElement(imageIndex - 1);
      } else {
        setCurrentFirstElement(imageIndex + 1);
      }
    };

    return (
      <Container>
        <TechMenu>
          {home.techMenuImages.map((techImage, i) => {
            if (i >= currentFirstElement && i < currentFirstElement + 5) {
              return (
                <TechListItem
                  key={i}
                  image={techImage.img.default}
                  imageAlt={techImage.alt}
                  animationState={i - currentFirstElement}
                />
              );
            }
          })}
        </TechMenu>
        <ControlsContainer>
          <ControlButton
            buttonType={'up'}
            disabled={currentFirstElement < -1}
            onClick={() => {
              handleTechChange('up');
            }}
          >
            <FaArrowUp size={'2em'} />
          </ControlButton>
          <ControlButton
            buttonType={'down'}
            disabled={currentFirstElement > home.techMenuImages.length - 4}
            onClick={() => {
              handleTechChange('down');
            }}
          >
            <FaArrowDown size={'2em'} />
          </ControlButton>
        </ControlsContainer>
      </Container>
    );
  },
);

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-center: center;
  align-items: center;
`;

const TechMenu = styled.ul`
  position: relative;
  padding: 0;
  margin: 0 1em 0 0;
  width: 100%;
  height: 100%;
`;

const ControlsContainer = styled.div`
  width: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ControlButton = styled.button<{ buttonType: 'up' | 'down' }>`
  margin: 1.5em 0;
  width: 3em;
  height: auto;
  background-color: transparent;
  border: none;
  outline: none;

  & svg {
  transition: all 0.3s ease;
  }

  ${(props) => {
    if (props.buttonType === 'up') {
      return css`
        transform: rotate(-30deg);
      `;
    } else {
      return css`
        transform: rotate(30deg);
      `;
    }
  }}

  &:hover {
    ${(props) => {
      if (props.buttonType === 'up') {
        return css`
          svg {
            margin-top: -1.2em;
            transform: scale(1.3);
          }
        `;
      } else {
        return css`
          svg {
            margin-bottom: -1.2em;
            transform: scale(1.3);
          }
        `;
      }
    }}
`;
