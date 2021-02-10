import * as React from 'react';
import { Spinner } from '../common/Spinner';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from '../../hooks/useWindowSize';
import igSectionBackground from '../../assets/images/homepage/ig_section_background.svg';
import igProfilePic from '../../assets/images/homepage/ig_profile_pic.jpg';
import { useEffect, useState } from 'react';
import { FaHeart, FaInstagram } from 'react-icons/fa';
import { InstagramPic } from '../../types';

export type Props = {
  media: Array<InstagramPic>;
  account: string;
  status: 'completed' | 'loading' | 'failed';
  numberOfMediaElements: number;
};

export interface HeaderProps {
  account: string;
  profilePic: string;
}

const InstagramSectionHeader: React.FC<HeaderProps> = ({
  account,
  profilePic,
}) => {
  const { t } = useTranslation();
  return (
    <HeaderContainer>
      <ProfilePicContainer
        href={`https://www.instagram.com/${account}/`}
        target={'_blank'}
        rel={'noreferrer'}
      >
        <InstagramProfilePic src={profilePic} />
        <span>
          <FaInstagram size={'2em'} color={'white'} />
        </span>
      </ProfilePicContainer>
      <VisitInstagramTitle>
        {t('instagram.visitProfile')}
        <InstagramLogo
          src={require('../../assets/images/homepage/instagram.svg').default}
        />
      </VisitInstagramTitle>
    </HeaderContainer>
  );
};

export interface InstagramMediaProps {
  instagramPic: InstagramPic;
  account: string;
  width: number;
}

/* <a href={this.props.url} rel="noopener" target="_blank">
<img src={this.props.src} alt={this.props.alt}></img>
</a> */

const InstagramMedia: React.FC<InstagramMediaProps> = ({
  instagramPic,
  account,
  width,
}) => {
  return (
    <ImageContainer>
      <ImageFront className={'image-front'}>
        <a
          href={
            instagramPic.postLink || `https://www.instagram.com/${account}/`
          }
          target={'_blank'}
          rel={'noreferrer'}
        >
          <Image
            src={instagramPic.displayImage}
            alt={instagramPic.accessibilityCaption || 'Instagram picture'}
          />
          {width < 576 && (
            <>
              <Caption>{instagramPic.caption}</Caption>
              <Likes>
                <FaHeart size={'2em'} color={'white'} />
                <LikesNumber>{instagramPic.likes}</LikesNumber>
              </Likes>
            </>
          )}
        </a>
      </ImageFront>
      <ImageBack className={'image-back'}>
        <a
          href={
            instagramPic.postLink || `https://www.instagram.com/${account}/`
          }
          target={'_blank'}
          rel={'noreferrer'}
        >
          <Image
            src={instagramPic.displayImage}
            alt={instagramPic.accessibilityCaption || 'Instagram picture'}
          />
          <Caption>
            {instagramPic.caption && instagramPic.caption.length > 100
              ? instagramPic.caption?.substring(0, 100) + '...'
              : instagramPic.caption}
          </Caption>
          <Likes>
            <FaHeart size={'2em'} color={'white'} />
            <LikesNumber>{instagramPic.likes}</LikesNumber>
          </Likes>
        </a>
      </ImageBack>
    </ImageContainer>
  );
};

export const InstagramFeed: React.FC<Props> = ({
  media,
  account,
  numberOfMediaElements,
  status = 'failed',
}) => {
  const { t } = useTranslation();
  const [currentShownPics, setCurrentShownPics] = useState<Array<InstagramPic>>(
    media.slice(0, numberOfMediaElements),
  );
  const [width] = useWindowSize();

  useEffect(() => {
    if (!!media.length && status === 'completed') {
      switch (true) {
        case width < 576 || width < 768:
          setCurrentShownPics(media.slice(0, 4));
          break;
        case width < 1200:
          setCurrentShownPics(media.slice(0, 8));
          break;
        default:
          setCurrentShownPics(media);
          break;
      }
    }
  }, [media, status, width]);

  return (
    <Container>
      {!!media.length && status === 'completed' && (
        <>
          <InstagramSectionHeader account={account} profilePic={igProfilePic} />
          <PicsShow>
            {currentShownPics.map((instagramPic, i) => {
              return (
                <InstagramMedia
                  key={i}
                  instagramPic={instagramPic}
                  account={account}
                  width={width}
                />
              );
            })}
          </PicsShow>
        </>
      )}
      {status === 'loading' && <Spinner />}
      {status === 'failed' && (
        <IgOfflineContainer
          href={`https://www.instagram.com/${account}/`}
          target={'_blank'}
          rel={'noreferrer'}
        >
          <InstagramSectionHeader account={account} profilePic={igProfilePic} />
          <NoPhotosImage
            src={require('../../assets/images/homepage/ig_offline.png').default}
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

const Container = styled.div`
  margin-top: 1em;
  background-color: ${(props) => props.theme.colors.background};
  background-image: linear-gradient(
      to bottom,
      ${(props) => props.theme.colors.background} 0%,
      transparent 15%,
      transparent 85%,
      ${(props) => props.theme.colors.background} 100%
    ),
    url(${igSectionBackground});
  background-size: contain;
  width: 100%;
  min-height: 55em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 576px) {
    min-height: 50em;
    background-size: cover;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ProfilePicContainer = styled.a`
  width: 10em;
  display: flex;
  justify-content: center;
  position: relative;

  & span {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  &:hover {
    @media (min-width: 576px) {
      & img {
        filter: brightness(0.5);
      }

      & span {
        display: initial;
      }
    }
  }
`;

const InstagramLogo = styled.img`
  width: 2em;
  height: 2em;
  margin-left: 1em;
`;

const InstagramProfilePic = styled.img`
  width: 100%;
  border-radius: 50%;
  height: auto;
  max-height: 10em;
  max-width: 10em;
`;

const PicsShow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  padding: 5em 0;
  margin-bottom: 10em;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin: 1em 0;
  position: relative;

  @media (min-width: 576px) {
    width: calc(50% - 1em);
    margin: 0.5em;

    transform-style: preserve-3d;
    perspective: 40em;
    transition: 0.5s;

    &:hover .image-front {
      transform: rotateX(-180deg) scale(2);
    }
    &:hover .image-back {
      transform: rotateX(0deg) scale(1.1);
      z-index: 5;
    }
  }

  @media (min-width: 768px) {
    width: calc(25% - 0.5em);
    margin: 0.25em;

    &:hover .image-back {
      transform: rotateX(0deg) scale(1.1);
    }
  }

  @media (min-width: 992px) {
    width: calc(25% - 2em);
    margin: 0.5em;
  }

  @media (min-width: 1200px) {
    width: calc(25% - 2em);
    margin: 0.5em;
  }
`;

const ImageFront = styled.div`
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  transform: rotateX(0deg);
  transition: 0.5s;
`;

const ImageBack = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  transform: rotateX(180deg);
  transition: 0.5s;
  text-align: center;

  & img {
    transform: scaleY(-1);
    filter: brightness(0.5);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  @media (min-width: 576px) {
    border-radius: 5px;
  }
`;

const Likes = styled.span`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: row;
  z-index: 2;

  @media (min-width: 576px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Caption = styled.span`
  position: absolute;
  font-size: 1em;
  width: 50%;
  text-shadow: 3px 0px 7px rgba(0, 0, 0, 0.8), -3px 0px 7px rgba(0, 0, 0, 0.8),
    0px 4px 7px rgba(0, 0, 0, 0.8);
  top: 20px;
  right: 20px;
  text-align: right;
  color: ${(props) => props.theme.colors.textColorWhite};
  z-index: 2;

  @media (min-width: 576px) {
    text-align: center;
    width: 95%;
    position: absolute;
    left: 50%;
    right: initial;
    transform: translateX(-50%);
  }
`;

const LikesNumber = styled.span`
  color: ${(props) => props.theme.colors.textColorWhite};
  font-family: Corben;
  font-size: 1em;
  word-spacing: 0.15em;
  letter-spacing: 0.02em;
  margin: 0 0.5em;
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
    max-width: 420px;
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

const VisitInstagramTitle = styled.h2`
  font-size: 2em;
  font-family: Corben;
  display: flex;
  align-items: center;
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
