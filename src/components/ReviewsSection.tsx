import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { HeadingTitle } from './HeadingTitle';
import i18next from 'i18next';
import ScrollContainer from 'react-indiana-drag-scroll';

import jsonDB from '../db/data.json';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import { ImageAnimation } from './ImageAnimation';
import { DotGroup } from './DotGroup';
import { Review } from '../types';

export interface ReviewProps {
  review: Review;
  activeReview: boolean;
}

const ReviewSlide: React.FC<ReviewProps> = ({ review, activeReview }) => {
  return (
    <ReviewContainer activeReview={activeReview}>
      <ReviewText>
        {i18next.language === 'it' ? review.reviewIT : review.reviewEN}
      </ReviewText>
      <ReviewAuthor>
        {review.writerName}
        {review.company && ' - ' + review.company}
      </ReviewAuthor>
    </ReviewContainer>
  );
};

export const ReviewsSection: React.FC = observer(() => {
  const { home } = useStores();
  const { t } = useTranslation();
  const [currentShownReview, setCurrentShownReview] = useState(0);

  const reviews = jsonDB.reviews;

  return (
    <Section>
      <HeadingTitle>{t('reviewsSection.talkAboutMe')}</HeadingTitle>
      <ReviewsContainer>
        {reviews.map((review, i) => {
          return (
            <ReviewSlide
              key={i}
              review={review}
              activeReview={i === currentShownReview}
            />
          );
        })}
        <DotGroup
          slidesNumber={reviews.length}
          activeIndex={currentShownReview}
          onDotClick={setCurrentShownReview}
        />
      </ReviewsContainer>
      <HeadingTitle>{t('reviewsSection.title')}</HeadingTitle>
      <ScrollContainer vertical={false} className={'companies-scroll'}>
        <CompaniesContainer>
          {home.companiesLogos.map((company, i) => {
            return (
              <ImageAnimation
                key={i}
                image={company.img}
                imageAlt={company.alt}
                imageStyle={{
                  height: '3em',
                }}
                animationDirection={'RightToLeft'}
                animationX={'5em'}
                animationDuration={1 + i * 0.2}
                animationRotation={'0deg'}
                showOnPhone={true}
              />
            );
          })}
        </CompaniesContainer>
      </ScrollContainer>
    </Section>
  );
});

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  & .companies-scroll {
    width: 100%;
    height: 10em;
    display: flex;
    flex-direction: row;

    cursor: move;
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;

    &:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }
`;

const CompaniesContainer = styled.div`
  padding: 0 2em;
  background-color: ${(props) => props.theme.colors.textColorWhite};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 -10px 5px -10px ${(props) => props.theme.colors.secondary},
    inset 0 -30px 20px -30px ${(props) => props.theme.colors.secondary},
    inset 0 -60px 35px -60px ${(props) => props.theme.colors.secondary},
    inset 0 10px 5px -10px ${(props) => props.theme.colors.secondary},
    inset 0 30px 20px -30px ${(props) => props.theme.colors.secondary},
    inset 0 60px 35px -60px ${(props) => props.theme.colors.secondary};

  @media (min-width: 992px) {
    min-width: 110%;
  }

  & img {
    margin-left: 5.5em;
  }
`;

const ReviewsContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundLight};
  color: ${(props) => props.theme.colors.textColorWhite};
  padding: 3em;
  padding-bottom: 0;
`;

const ReviewContainer = styled.div<{ activeReview: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  -webkit-transition: all 0.6s ease-out,
    -webkit-all 0.6s cubic-bezier(0.8, 1.35, 0.75, 1.45);
  transition: all 0.6s ease-out,
    -webkit-all 0.6s cubic-bezier(0.8, 1.35, 0.75, 1.45);

  ${(props) =>
    !props.activeReview &&
    css`
      position: absolute;
      top: 0;
      transform: translateX(100vw);
      opacity: 0;
    `}
`;

const ReviewText = styled.p`
  position: relative;
  font-size: 1.3em;
  font-style: italic;
  letter-spacing: 0.1em;
  font-family: Corben;
  margin: auto;
  width: 85%;
  position: relative;
  text-align: center;

  &:before {
    content: '“';
    font-size: 5em;
    line-height: 2em;
    position: absolute;
    top: -1em;
    color: ${(props) => props.theme.colors.secondary};
    left: 0;
    opacity: 0.4;
    font-weight: 400;
    display: inline-block;
    text-shadow: ${(props) => props.theme.colors.textColorBlack} -1px -1px 1px,
      ${(props) => props.theme.colors.primary} 2px 2px 2px,
      ${(props) => props.theme.colors.primary} -2px -2px 2px;
  }
`;

const ReviewAuthor = styled.span`
  display: block;
  font-family: Corben;
  font-weight: bold;
  text-transform: uppercase;
  margin: 2em 0;
  text-align: center;
`;
