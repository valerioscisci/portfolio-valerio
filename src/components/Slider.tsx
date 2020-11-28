import React from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slide, Slider, Image } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../components/Spinner';

export interface SliderProps {
  imagesArray: { alt: string; img: { default: string } }[];
}

// Component used https://www.npmjs.com/package/pure-react-carousel
export const MainSlider: React.FC<SliderProps> = ({ imagesArray }) => {
  const { t } = useTranslation();

  const imagesOverlayTexts: Array<string> = [
    t(`slider.heading1`),
    t(`slider.heading2`),
    t(`slider.heading3`),
    t(`slider.heading4`),
  ];

  return (
    <CarouselContainer>
      <CarouselProvider
        interval={3000}
        isPlaying={true}
        naturalSlideWidth={1920}
        hasMasterSpinner={true}
        naturalSlideHeight={1080}
        totalSlides={4}
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
                  isBgImage={true}
                  hasMasterSpinner={true}
                  alt={image.alt}
                  src={image.img.default}
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

  & .carousel {
    & .carousel__slider {
      & .carousel__slider-tray-wrapper {
        max-height: 80vh;
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
    ${(props) => props.theme.colors.background}
  );
`;

const Header = styled.h1`
  color: ${(props) => props.theme.colors.textColorWhite};
  letter-spacing: 0.1em;
  font-family: Corben;
  margin-top: 10%;
  font-size: 2em;
  max-width: 75%;
`;
