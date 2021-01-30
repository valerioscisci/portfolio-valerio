import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';
import { useTranslation } from 'react-i18next';
import { useThrottle } from '@react-hook/throttle';

export interface ParallaxSectionProps {
  scrollY: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  scrollY,
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [offsetTop, setOffsetTop] = useThrottle<number>(0, 144);
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
  }, [isVisible, setOffsetTop, scrollY]);

  const generatePlanes = async () => {
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
          const startingPlanePosition = -window.innerWidth / planeInfo.width;
          const commonPlaneTransform = `translateX(${
            (scrollY / planeInfo.width) * 15
          }px) translateY(0) translateZ(0)`;

          return (
            <Plane
              key={index}
              src={require('../../assets/images/homepage/plane.svg').default}
              alt={'freedom'}
              startingPlanePosition={startingPlanePosition}
              startingPlaneHeight={planeInfo.startingHeight}
              commonPlaneTransform={commonPlaneTransform}
              planeWidth={planeInfo.width}
              planeDirection={planeInfo.direction}
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
      onChange={async (isVisibleNewValue: boolean) => {
        setIsVisible(isVisibleNewValue);
        if (isVisible) {
          await generatePlanes();
        }
      }}
    >
      <Section ref={sectionRef}>
        <BackgroundImage
          src={require('../../assets/images/homepage/cappadocia.jpg').default}
          alt={'parallax'}
          style={{
            transform: `translateY(${
              offsetTop * 0.2
            }px) translateX(0) translateZ(0)`,
            willChange: 'transform',
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
  will-change: transform;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Overlap = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-content: center;
  justifycontent: center;
  z-index: 1;

  -webkit-box-shadow: inset 0px 0px 15px 10px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 15px 10px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 15px 10px rgba(0, 0, 0, 0.3);
`;

interface PlaneProps {
  startingPlanePosition: number;
  startingPlaneHeight: number;
  commonPlaneTransform: string;
  planeWidth: number;
  planeDirection: string;
}

const Plane = styled.img.attrs<PlaneProps>((props) => ({
  style: {
    filter: `blur(${props.planeWidth / 30}px)`,
    width: props.planeWidth,
    top: props.startingPlaneHeight,
    ...(props.planeDirection === 'left'
      ? {
          WebkitTransform: 'scaleX(-1)' + props.commonPlaneTransform,
          transform: 'scaleX(-1)' + props.commonPlaneTransform,
          right: props.startingPlanePosition,
        }
      : {
          WebkitTransform: props.commonPlaneTransform,
          transform: props.commonPlaneTransform,
          left: props.startingPlanePosition,
        }),
  },
}))<PlaneProps>`
  height: auto;
  position: absolute;
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
  cursor: default;  
  
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
