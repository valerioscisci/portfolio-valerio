import * as React from 'react';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { FaHeart, FaInstagram } from 'react-icons/fa';
import { InstagramPic } from '../../../types';
import { TFunction } from 'next-i18next';
import { url } from '../../../config/config';

const media = [
  {
    accessibilityCaption: 'Autumnal mood 🍂🍂',
    caption: 'Autumnal mood 🍂🍂',
    commentsNumber: 1,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/1.jpg`,
    id: '1',
    likes: 45,
    postLink: 'https://www.instagram.com/p/CWyMlqqMMCY/',
  },
  {
    accessibilityCaption: 'Friends a 2000 metri ⛰️🍁',
    caption: 'Friends a 2000 metri ⛰️🍁',
    commentsNumber: 2,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/2.jpg`,
    id: '2',
    likes: 26,
    postLink: 'https://www.instagram.com/p/CVyjf3wo736/',
  },
  {
    accessibilityCaption:
      "Di robe fighe ne faccio tante, o almeno di provo visto che la vita è breve e bisogna sfruttare al massimo il nostro tempo, ma quando il mese scorso ho deciso di iniziare il percorso per prendere il brevetto da sub, non avevo ancora idea di cosa mi so sarebbe palesato davanti! 😍 Il mondo subacqueo è qualcosa di così profondamente diverso da quello a cui siamo abituati in superficie che ogni secondo che ho passato li mi è sembrato un'eternità.Queste foto le ho scattate ieri, durante la mia prima vera immersione in mare aperto, in uno dei posti più spettacolari di questa fantastica isola che è Lanzarote! 📸Ogni statua si questo museo ha un significato molto profondo, ma solo vedendole da vicino si apprezza davvero la cosa.Ad esempio, i due che si fanno il selfie non hanno il volto, a rappresentare il fatto che questa società malata è così presa dalla tecnologia che pian piano sta perdendo la sua umanità. 😶Lascio a voi i commenti del resto ❤️",
    caption:
      "Di robe fighe ne faccio tante, o almeno di provo visto che la vita è breve e bisogna sfruttare al massimo il nostro tempo, ma quando il mese scorso ho deciso di iniziare il percorso per prendere il brevetto da sub, non avevo ancora idea di cosa mi so sarebbe palesato davanti! 😍 Il mondo subacqueo è qualcosa di così profondamente diverso da quello a cui siamo abituati in superficie che ogni secondo che ho passato li mi è sembrato un'eternità.Queste foto le ho scattate ieri, durante la mia prima vera immersione in mare aperto, in uno dei posti più spettacolari di questa fantastica isola che è Lanzarote! 📸Ogni statua si questo museo ha un significato molto profondo, ma solo vedendole da vicino si apprezza davvero la cosa.Ad esempio, i due che si fanno il selfie non hanno il volto, a rappresentare il fatto che questa società malata è così presa dalla tecnologia che pian piano sta perdendo la sua umanità. 😶Lascio a voi i commenti del resto ❤️",
    commentsNumber: 5,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/3.jpg`,
    id: '3',
    likes: 45,
    postLink: 'https://www.instagram.com/p/CPNZwHHNGnu/',
  },
  {
    accessibilityCaption:
      "Mentre attendete l'estate, sapevate che andare all'estero dal 15 maggio sarà ancora più facile? Niente più quarantena di 5 giorni al rientro in Italia, che aspettate a prenotare? ⛱️",
    caption:
      "Mentre attendete l'estate, sapevate che andare all'estero dal 15 maggio sarà ancora più facile? Niente più quarantena di 5 giorni al rientro in Italia, che aspettate a prenotare? ⛱️",
    commentsNumber: 0,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/4.jpg`,
    id: '4',
    likes: 29,
    postLink: 'https://www.instagram.com/p/COwzWeaISGL/',
  },
  {
    accessibilityCaption:
      'Oggi vi mostro alcune delle postazioni da cui ho lavorato negli ultimi mesi! Purtroppo non sono un fan dei co-working e spesso preferisco lavorare da casa, ma ogni tanto mi concedo qualche scappatella in bar che hanno una buona connessione. 🌐 Da quando ho lasciato alle spalle la sedia ergonomica di un ufficio per poter lavorare da dove voglio, ho sempre cercato posti che mi aiutassero a ricaricare le batterie durante e dopo il lavoro 🖥️👨  Sono curioso, qual è il posto che preferite per svolgere il vostro lavoro❓',
    caption:
      'Oggi vi mostro alcune delle postazioni da cui ho lavorato negli ultimi mesi! Purtroppo non sono un fan dei co-working e spesso preferisco lavorare da casa, ma ogni tanto mi concedo qualche scappatella in bar che hanno una buona connessione. 🌐 Da quando ho lasciato alle spalle la sedia ergonomica di un ufficio per poter lavorare da dove voglio, ho sempre cercato posti che mi aiutassero a ricaricare le batterie durante e dopo il lavoro 🖥️👨  Sono curioso, qual è il posto che preferite per svolgere il vostro lavoro❓',
    commentsNumber: 0,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/5.jpg`,
    id: '5',
    likes: 24,
    postLink: 'https://www.instagram.com/p/COgAcu1tve4/',
  },
  {
    accessibilityCaption:
      "Scorrendo le foto delle isole Canarie uno si aspetta spiagge caraibiche e vulcani vari... Fuerteventura, tra le altre cose, è anche tappezzata di mulini a vento(se no non si chiamava così l'isola 😁) È un piacere anche solo guidare tra le stradine Canarie se lungo il cammino incontri queste spettacolari costruzioni 🌬️",
    caption:
      "Scorrendo le foto delle isole Canarie uno si aspetta spiagge caraibiche e vulcani vari... Fuerteventura, tra le altre cose, è anche tappezzata di mulini a vento(se no non si chiamava così l'isola 😁) È un piacere anche solo guidare tra le stradine Canarie se lungo il cammino incontri queste spettacolari costruzioni 🌬️",
    commentsNumber: 2,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/6.jpg`,
    id: '6',
    likes: 54,
    postLink: 'https://www.instagram.com/p/COay7l0B-Pv/',
  },
  {
    accessibilityCaption:
      "Definitely one to check out if you are planning to come to Fuerteventura 🤙🏻 If you are lucky you will encounter goats climbing around, rabbits and other animals that will highlight your hike 🏃🏃‍♀️ PS: Fuerte is finally 'green' so covid restrictions are even less annoying!",
    caption:
      "Definitely one to check out if you are planning to come to Fuerteventura 🤙🏻 If you are lucky you will encounter goats climbing around, rabbits and other animals that will highlight your hike 🏃🏃‍♀️ PS: Fuerte is finally 'green' so covid restrictions are even less annoying!",
    commentsNumber: 0,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/7.jpg`,
    id: '7',
    likes: 34,
    postLink: 'https://www.instagram.com/p/COV-KOvol35/',
  },
  {
    accessibilityCaption:
      "l lavoro occuperà gran parte della vostra vita e l'unico modo per essere davvero soddisfatto è fare qualcosa che ami! 🔝 E tu stai costruendo la tua carriera così da non avere rimorsi tra qualche anno e cercando di non finire in un ufficio di 5 metri quadri ad odiare la tua vita? 🧠",
    caption:
      "l lavoro occuperà gran parte della vostra vita e l'unico modo per essere davvero soddisfatto è fare qualcosa che ami! 🔝 E tu stai costruendo la tua carriera così da non avere rimorsi tra qualche anno e cercando di non finire in un ufficio di 5 metri quadri ad odiare la tua vita? 🧠",
    commentsNumber: 7,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/8.jpg`,
    id: '8',
    likes: 21,
    postLink: 'https://www.instagram.com/p/COSXHIDh9kj/',
  },
  {
    accessibilityCaption:
      'La vita nel deserto 🏜️ Quale preferisci da 1 a 7? ------ Life in the desert 🏜️ Which one do you prefer 1-7?',
    caption:
      'La vita nel deserto 🏜️ Quale preferisci da 1 a 7? ------ Life in the desert 🏜️ Which one do you prefer 1-7?',
    commentsNumber: 1,
    dimensions: {
      height: 512,
      width: 512,
    },
    displayImage: `${url}images/instagram/9.jpg`,
    id: '9',
    likes: 35,
    postLink: 'https://www.instagram.com/p/COIv9tDBCEt/',
  },
];

export type Props = {
  account: string;
  width: number;
  t: TFunction;
};

export interface HeaderProps {
  account: string;
  profilePic: string;
  t: TFunction;
}

const InstagramSectionHeader: React.FC<HeaderProps> = ({
  account,
  profilePic,
  t,
}) => {
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
        {t('common:instagram.visitProfile')}
        <InstagramLogo src={`${url}images/homepage/instagram.svg`} />
      </VisitInstagramTitle>
    </HeaderContainer>
  );
};

export interface InstagramMediaProps {
  instagramPic: InstagramPic;
  account: string;
  width: number;
}

const InstagramMedia: React.FC<InstagramMediaProps> = ({
  instagramPic,
  account,
  width,
}) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = useCallback(() => {
    setImageError(!imageError);
  }, [imageError]);

  return !imageError ? (
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
            src={
              !imageError
                ? instagramPic.displayImage
                : 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg'
            }
            onError={handleImageError}
            alt={instagramPic.accessibilityCaption || 'Instagram picture'}
          />
          {width < 576 && (
            <>
              <Caption>
                {instagramPic.caption && instagramPic.caption.length > 300
                  ? instagramPic.caption.substring(0, 300) + '...'
                  : instagramPic.caption}
              </Caption>
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
            src={
              !imageError
                ? instagramPic.displayImage
                : 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg'
            }
            alt={instagramPic.accessibilityCaption || 'Instagram picture'}
          />
          <Caption>
            {instagramPic.caption && instagramPic.caption.length > 100
              ? instagramPic.caption.substring(0, 100) + '...'
              : instagramPic.caption}
          </Caption>
          <Likes>
            <FaHeart size={'2em'} color={'white'} />
            <LikesNumber>{instagramPic.likes}</LikesNumber>
          </Likes>
        </a>
      </ImageBack>
    </ImageContainer>
  ) : (
    <></>
  );
};

export const InstagramFeed: React.FC<Props> = ({ account, width, t }) => {
  const [currentShownPics, setCurrentShownPics] = useState<Array<InstagramPic>>(
    media,
  );

  useEffect(() => {
    switch (true) {
      case width < 576 || width < 768:
        setCurrentShownPics(media.slice(0, 4));
        break;
      default:
        setCurrentShownPics(media);
        break;
    }
  }, [media, width]);

  return (
    <Container>
      <InstagramSectionHeader
        account={account}
        profilePic={`${url}images/homepage/ig_profile_pic.jpg`}
        t={t}
      />
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
    url(${url}images/homepage/ig_section_background.jpg);
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
  max-width: 1200px;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin: 1em 0;
  position: relative;

  @media (min-width: 576px) {
    width: calc(50% - 1em);
    margin: 0.5em;

    transform-style: preserve-3d;
    perspective: 100em;
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
    width: calc(33% - 2em);
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

const VisitInstagramTitle = styled.h2`
  padding: 0 1em;
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
