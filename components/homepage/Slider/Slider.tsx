import React from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slide, Slider, Image } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { Spinner } from '../../../src/components/common/Spinner';
import { TFunction } from 'next-i18next';
import { url } from '../../../config/config';

const imagesArray = [
  { alt: 'jetsky', img: `${url}images/slider/0.jpg` },
  { alt: 'skydive', img: `${url}images/slider/1.jpg` },
  { alt: 'work anywhere', img: `${url}images/slider/2.jpg` },
  { alt: 'wilderness', img: `${url}images/slider/3.jpg` },
  { alt: 'travel freely', img: `${url}images/slider/4.jpg` },
];

// Component used https://www.npmjs.com/package/pure-react-carousel

interface MainSliderProps {
  t: TFunction;
}

export const MainSlider: React.FC<MainSliderProps> = ({ t }) => {
  const imagesOverlayTexts: Array<string> = [
    t(`homepage:slider.heading1`),
    t(`homepage:slider.heading2`),
    t(`homepage:slider.heading3`),
    t(`homepage:slider.heading4`),
    t(`homepage:slider.heading5`),
  ];

  return (
    <CarouselContainer>
      <CarouselProvider
        interval={3500}
        isPlaying={true}
        naturalSlideWidth={1920}
        hasMasterSpinner={true}
        naturalSlideHeight={1080}
        totalSlides={5}
        dragEnabled={false}
        touchEnabled={false}
        infinite={true}
      >
        <Slider
          spinner={() => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Spinner />
            </div>
          )}
        >
          {imagesArray.map((image, index) => {
            return (
              <Slide index={index} key={index}>
                <OverlayShadow>
                  <Header>{imagesOverlayTexts[index]}</Header>
                </OverlayShadow>
                <Image
                  isBgImage={false}
                  hasMasterSpinner={true}
                  alt={image.alt}
                  src={image.img}
                />
              </Slide>
            );
          })}
        </Slider>
      </CarouselProvider>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.background};

  & .carousel {
    & .carousel__slider {
      outline: none;
      & .carousel__slider-tray-wrapper {
        max-height: 100vh;
        clip-path: polygon(100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);
        & .carousel__slider-tray {
          display: flex;
          margin: 0px;
          padding: 0px;
          & .carousel__slide {
            & .carousel__inner-slide {
              & .carousel__image {
                object-fit: cover;
                object-position: 50% 50%;
                background-position: center bottom;
              }
              & .carousel__slide-focus-ring {
                outline: none;
              }
            }
          }
        }
      }
    }
  }
`;

const OverlayShadow = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    ellipse,
    rgba(34, 40, 49, 0.5) 100%,
    ${(props) => props.theme.colors.backgroundDark}
  );
`;

const Header = styled.h1`
  color: ${(props) => props.theme.colors.textColorWhite};
  letter-spacing: 0.2em;
  font-family: Corben;
  margin-top: 15%;
  font-size: 2em;
  max-width: 75%;
  font-style: italic;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    right: 25%;
    top: -5%;
    left: 25%;
    height: 10px;
    background: linear-gradient(
          ${(props) => props.theme.colors.secondary},
          ${(props) => props.theme.colors.secondary}
        )
        bottom,
      linear-gradient(
          ${(props) => props.theme.colors.secondary},
          ${(props) => props.theme.colors.secondary}
        )
        top;
    background-size: 100% 2px, 100% 6px;
    background-repeat: no-repeat;
  }
`;
