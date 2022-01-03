import React, { Fragment, useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import { url } from '../../../../config/config';
import { TechListItem } from './TechListItem/TechListItem';

const techMenuImages = [
  {
    alt: 'React',
    img: `${url}/images/techMenu/react.svg`,
    techName: 'React',
  },
  {
    alt: 'React Native',
    img: `${url}/images/techMenu/react_native.svg`,
    techName: 'React Native',
  },
  {
    alt: 'Wordpress',
    img: `${url}/images/techMenu/wordpress.svg`,
    techName: 'Wordpress',
  },
  {
    alt: 'NextJs',
    img: `${url}/images/techMenu/nextjs.svg`,
    techName: 'NextJS',
  },
  {
    alt: 'Django',
    img: `${url}/images/techMenu/django.svg`,
    techName: 'Django',
  },
  {
    alt: 'Bootstrap',
    img: `${url}/images/techMenu/bootstrap.svg`,
    techName: 'Bootstrap',
  },
  {
    alt: 'Html5',
    img: `${url}/images/techMenu/html5.svg`,
    techName: 'Html5',
  },
  {
    alt: 'Css3',
    img: `${url}/images/techMenu/css3.svg`,
    techName: 'Css3',
  },
  {
    alt: 'MongoDB',
    img: `${url}/images/techMenu/mongodb.svg`,
    techName: 'MongoDB',
  },
  {
    alt: 'MySQL',
    img: `${url}/images/techMenu/mysql.svg`,
    techName: 'MySQL',
  },
  {
    alt: 'SQLite',
    img: `${url}/images/techMenu/sqlite.svg`,
    techName: 'SQLite',
  },
  {
    alt: 'Sass',
    img: `${url}/images/techMenu/sass.svg`,
    techName: 'Sass',
  },
  {
    alt: 'NodeJs',
    img: `${url}/images/techMenu/nodejs.svg`,
    techName: 'NodeJs',
  },
  {
    alt: 'Ethereum',
    img: `${url}/images/techMenu/ethereum.svg`,
    techName: 'Ethereum',
  },
];

export interface TechListProps {
  onTechChange: (newTech: string) => void;
}

export const TechList: React.FC<TechListProps> = ({ onTechChange }) => {
  const [currentFirstElement, setCurrentFirstElement] = useState<number>(0);

  useEffect(() => {
    onTechChange(techMenuImages[currentFirstElement + 2].techName);
  }, [onTechChange, currentFirstElement]);

  const handleTechChange = (direction: 'up' | 'down') => {
    const imageIndex = currentFirstElement % techMenuImages.length;

    if (direction === 'up') {
      setCurrentFirstElement(imageIndex - 1);
    } else {
      setCurrentFirstElement(imageIndex + 1);
    }
  };

  return (
    <Container>
      <TechMenu>
        {techMenuImages.map((techImage, i) => {
          if (i >= currentFirstElement && i < currentFirstElement + 5) {
            return (
              <TechListItem
                key={i}
                image={techImage.img}
                imageAlt={techImage.alt}
                animationState={i - currentFirstElement}
              />
            );
          } else {
            return <Fragment key={i}></Fragment>;
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
          disabled={currentFirstElement > techMenuImages.length - 4}
          onClick={() => {
            handleTechChange('down');
          }}
        >
          <FaArrowDown size={'2em'} />
        </ControlButton>
      </ControlsContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-center: center;
    align-items: center;
    min-height: 500px;
  }
`;

const TechMenu = styled.ul`
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    margin: 0 1em 0 0;
    min-height: 500px;
  }
`;

const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (min-width: 768px) {
    width: 2em;
    flex-direction: column;
  }
`;

const ControlButton = styled.button<{ buttonType: 'up' | 'down' }>`
  margin: 0 1em;
  width: 2em;
  height: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 3em;
    margin: 1em 0;
  }

  & svg {
    transition: all 0.3s ease;
  }

  ${(props) => {
    if (props.buttonType === 'up') {
      return css`
        transform: rotate(-90deg);

        @media (min-width: 768px) {
          padding-bottom: 1em;
          transform: rotate(-30deg);
        }
      `;
    } else {
      return css`
        transform: rotate(-90deg);

        @media (min-width: 768px) {
          padding-top: 1em;
          transform: rotate(30deg);
        }
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
