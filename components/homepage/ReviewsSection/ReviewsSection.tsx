import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Review } from '../../../types';
import { NextRouter } from 'next/router';
import { TFunction } from 'next-i18next';
import { HeadingTitle } from '../../ui/HeadingTitle/HeadingTitle';
import { DotGroup } from '../../common/DotGroup/DotGroup';
import { ImageAnimation } from '../../common/ImageAnimation/ImageAnimation';
import { url } from '../../../config/config';
import getReviewsHelper from '../../../helpers/homepage/getReviewsHelper';
import { ErrorHandler } from '../../common/ErrorHandler/ErrorHandler';
import { Spinner } from '../../common/Spinner/Spinner';

const companiesLogos = [
  {
    alt: 'Regione Marche',
    img: `${url}images/companies/logo_regione_marche.png`,
  },
  {
    alt: 'aenl',
    img: `${url}images/companies/logo_aenl.png`,
  },
  {
    alt: 'La Casa di Nicole',
    img: `${url}images/companies/logo_casa_nicole.png`,
  },
  {
    alt: 'Randy.gg',
    img: `${url}images/companies/logo_randy.png`,
  },
  {
    alt: 'ETT',
    img: `${url}images/companies/logo_ett.png`,
  },
  {
    alt: 'T33',
    img: `${url}images/companies/logo_t33.png`,
  },
  {
    alt: 'Mostaza',
    img: `${url}images/companies/logo_mostaza.png`,
  },
];
export interface ReviewProps {
  review: Review;
  activeReview: boolean;
  router: NextRouter;
}

const ReviewSlide: React.FC<ReviewProps> = ({
  review,
  activeReview,
  router,
}) => {
  return (
    <ReviewContainer activeReview={activeReview}>
      <ReviewText>
        {router.locale === 'it' ? review.reviewIT : review.reviewEN}
      </ReviewText>
      <ReviewAuthor>
        {review.writerName}
        {review.company && ' - ' + review.company}
      </ReviewAuthor>
    </ReviewContainer>
  );
};

interface ReviewsSectionProps {
  width: number;
  router: NextRouter;
  t: TFunction;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  width,
  router,
  t,
}) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const [reviewsError, setReviewsError] = useState(false);
  const [currentShownReview, setCurrentShownReview] = useState(0);

  const getReviews = useCallback(async () => {
    setReviewsError(false);
    setLoading(true);
    const reviews = await getReviewsHelper();
    if (reviews.message === 'success') {
      setReviews(reviews.reviews);
    } else {
      setReviewsError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Section>
      <HeadingTitle>{t('homepage:reviewsSection.talkAboutMe')}</HeadingTitle>
      {loading ? (
        <Spinner />
      ) : reviewsError ? (
        <ErrorHandler t={t} reloadButton={true} reloadFunction={getReviews}>
          {t('homepage:reviewsSection.reviewsFetchingError')}
        </ErrorHandler>
      ) : (
        <ReviewsContainer>
          {reviews.map((review, i) => {
            return (
              <ReviewSlide
                key={i}
                review={review}
                activeReview={i === currentShownReview}
                router={router}
              />
            );
          })}
          {reviews.length && (
            <DotGroup
              slidesNumber={reviews.length}
              activeIndex={currentShownReview}
              onDotClick={setCurrentShownReview}
            />
          )}
        </ReviewsContainer>
      )}
      <HeadingTitle>{t('homepage:reviewsSection.title')}</HeadingTitle>
      <ScrollContainer vertical={false} className={'companies-scroll'}>
        <CompaniesContainer>
          {companiesLogos.map((company, i) => {
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
                animationDuration={width > 768 ? 1 + i * 0.2 : 1}
                animationRotation={'0deg'}
                showOnPhone={true}
              />
            );
          })}
        </CompaniesContainer>
      </ScrollContainer>
    </Section>
  );
};

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
  clip-path: polygon(0 0, 100% 19%, 100% 100%, 0 82%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10em 1em;
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
  line-height: 1.8em;
  font-style: italic;
  letter-spacing: 0.1em;
  font-family: Manrope;
  margin: auto;
  width: 85%;
  position: relative;
  text-align: center;

  &:before {
    content: '“';
    font-family: Corben;
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
