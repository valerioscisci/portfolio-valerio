import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';
import { useTranslation } from 'react-i18next';

export interface ParallaxSectionProps {
  scrollY: any;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  scrollY,
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [offsetTop, setOffsetTop] = useState<number>(0);
  const [planesStartingInfo, setPlanesStartingInfo] = useState<
    Array<{
      startingHeight: number;
      direction: string;
      width: number;
    }>
  >([]);

  const sectionRef = useRef<any>();

  useEffect(() => {
    if (isVisible) {
      setOffsetTop(scrollY - sectionRef.current.offsetTop);
    }
  }, [offsetTop, isVisible, sectionRef, scrollY]);

  const generatePlanes = () => {
    const numberOfPlanes = Math.floor(Math.random() * (12 - 8 + 1) + 8);
    const width = 22;
    const newPlanesArray = [];
    // For each plane generate the starting point and the direction
    for (var i = 0; i < numberOfPlanes; i++) {
      const startingHeight = Math.floor(
        Math.random() * (sectionRef.current.offsetHeight + 1),
      );
      const direction = i % 2 === 0 ? 'left' : 'right';

      newPlanesArray.push({
        startingHeight,
        direction,
        width: width * i,
      });
    }
    setPlanesStartingInfo(newPlanesArray);
  };

  const showPlanes = () => {
    return (
      <Overlap>
        {planesStartingInfo.map((planeInfo, index) => {
          return (
            <img
              key={index}
              src={require('../assets/images/plane.svg').default}
              alt={'freedom'}
              style={{
                width: planeInfo.width,
                height: 'auto',
                position: 'absolute',
                filter: `blur(${planeInfo.width / 30}px)`,
                top: planeInfo.startingHeight,
                ...(planeInfo.direction === 'left'
                  ? {
                      WebkitTransform: `scaleX(-1) translateX(${
                        (scrollY / planeInfo.width) * 15
                      }px) translateZ(0)`,
                      transform: `scaleX(-1) translateX(${
                        (scrollY / planeInfo.width) * 15
                      }px) translateZ(0)`,
                      right: -window.innerWidth / planeInfo.width,
                    }
                  : {
                      WebkitTransform: `translateX(${
                        (scrollY / planeInfo.width) * 15
                      }px) translateZ(0)`,
                      transform: ` translateX(${
                        (scrollY / planeInfo.width) * 15
                      }px) translateZ(0)`,
                      left: -window.innerWidth / planeInfo.width,
                    }),
              }}
            />
          );
        })}
        <PlaneText>{t('parallax.heading')}</PlaneText>
      </Overlap>
    );
  };
  return (
    <VisibilitySensor
      partialVisibility
      onChange={(isVisibleNewValue: boolean) => {
        setIsVisible(isVisibleNewValue);
        if (!isVisible) {
          generatePlanes();
        }
      }}
    >
      <Section ref={sectionRef}>
        <BackgroundImage
          src={require('../assets/images/cappadocia.jpg').default}
          alt={'parallax'}
          style={{
            transform: `translateY(${offsetTop * 0.5}px)`,
          }}
        />
        {showPlanes()}
      </Section>
    </VisibilitySensor>
  );
};

const Section = styled.section`
  width: 100%;
  height: 150vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
`;

const Overlap = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-content: center;
  justifycontent: center;
  z-index: 1;
`;

const PlaneText = styled.h1`
  color: ${(props) => props.theme.colors.textColorWhite};
  text-align: center;
  letter-spacing: 0.1em;
  font-family: Corben;
  font-size: 2em;
  margin: auto;
  width: 55%;
  z-index: 2;
  position: relative;
  
  
  @media (min-width: 1200px) {
    font-size: 2.5em;
  }

  &:before{
    content: "“";
    font-size: 4em;
    line-height: 2em;
    position: absolute;
    top: -0.9em;
    color: ${(props) => props.theme.colors.secondary}
    right: 0;
    opacity: 0.4;
    font-weight: 400;
    display: inline-block;
    text-shadow: white 2px 2px 2px, #4E7CC9 4px 4px 2px, 6px 6px, #918A84 8px 8px; 
  }
`;
