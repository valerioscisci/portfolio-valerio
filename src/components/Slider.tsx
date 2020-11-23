import React from 'react';
import styled from 'styled-components';
import { CarouselProvider, Slide, Slider, Image } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';

export interface SliderProps {
  imagesArray: { alt: string; img: { default: string } }[];
}

export const MainSlider: React.FC<SliderProps> = ({ imagesArray }) => {
  return (
    <CarouselContainer>
      <CarouselProvider
        interval={3000}
        isPlaying={true}
        naturalSlideWidth={1920}
        naturalSlideHeight={1080}
        totalSlides={4}
        dragEnabled={true}
        touchEnabled={true}
        infinite={true}
      >
        <Slider>
          {imagesArray.map((image, index) => {
            return (
              <Slide index={index} key={index}>
                <OverlayShadow></OverlayShadow>
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
