import * as React from 'react';
import withInstagramFeed from 'origen-react-instagram-feed';
import compose from 'recompose/compose';
import { Spinner } from './Spinner';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import igSectionBackground from '../assets/images/homepage/ig_section_background.svg';

export type Props = {
  media?: Array<{
    displayImage: string;
    id?: string;
    postLink?: string;
    accessibilityCaption?: string;
  }>;
  account: string;
  status: 'completed' | 'loading' | 'failed';
};

const InstaGrid = ({ media, account, status }: Props) => {
  const { t } = useTranslation();
  console.log(media, account, status);
  return (
    <Container>
      {media &&
        status === 'completed' &&
        media.map(({ displayImage, id, postLink, accessibilityCaption }) => (
          <div key={id || displayImage}>
            <a href={postLink || `https://www.instagram.com/${account}/`}>
              <img
                src={displayImage}
                alt={accessibilityCaption || 'Instagram picture'}
              />
            </a>
          </div>
        ))}
      {status === 'loading' && <Spinner />}
      {status === 'failed' && (
        <IgOfflineContainer
          href={`https://www.instagram.com/${account}/`}
          target={'_blank'}
          rel={'noreferral'}
        >
          <VisitInstagramTitle>{t('instagram.noPhotos')}</VisitInstagramTitle>
          <NoPhotosImage
            src={require('../assets/images/homepage/ig_offline.png').default}
            alt={t('instagram.noPhotos')}
          />
          <NoPhotosDescription>
            {t('instagram.noPhotosDescription')}
          </NoPhotosDescription>
        </IgOfflineContainer>
      )}
    </Container>
  );
};

InstaGrid.defaultProps = {
  media: undefined,
};

export default compose(withInstagramFeed)(InstaGrid);

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  background-image: url(${igSectionBackground});
  background-size: cover;
  width: 100%;
  min-height: 40em;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 576px) {
    min-height: 35em;
  }
`;

const IgOfflineContainer = styled.a`
  position: relative;
  height: 90%;
  display: flex;
  flex-direction: column;
  max-width: 75%;
  padding: 1em 1.5em 0em;
  border-style: solid;
  border-width: 1px;
  border-color: #edf1f7;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.textColorWhite};
  text-decoration: none;

  color: ${(props) => props.theme.colors.textColorBlack};

  @media (min-width: 576px) {
    max-width: 360px;
  }

  @media (min-width: 1440px) {
    max-width: 460px;
  }

  &:hover {
    box-shadow: 0 0 1em 3px rgba(230, 234, 240, 0.54);
    outline: 0;
  }
`;

const NoPhotosImage = styled.img`
  position: absolute;
  width: 130%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.7;
  z-index: 1;
`;

const NoPhotosDescription = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;

  font-family: Corben;
  color: ${(props) => props.theme.colors.textColorGrey};
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  z-index: 2;
`;

const VisitInstagramTitle = styled.h3`
  text-align: center;
  background: #d6249f;
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
