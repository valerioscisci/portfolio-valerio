import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import { Navbar } from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MainSlider } from '../components/Slider';
import { Spinner } from '../components/Spinner';
import brush from '../assets/images/brush.png';
import { Button } from '../components/Button';
import { FaArrowRight } from 'react-icons/fa';
import { ImageAnimation } from '../components/ImageAnimation';
import { ParallaxSection } from '../components/ParallaxSection';
import { KnownTechSection } from '../components/KnownTechSection';

const HomeScreen = observer(() => {
  const { home } = useStores();
  const [width, setWidth] = useState(window.innerWidth); // width state
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  const navLinks = [
    { name: t(`navbar.home`), route: '/' },
    { name: t(`navbar.about`), route: '/about' },
    { name: t(`navbar.portfolio`), route: '/portfolio' },
    { name: t(`navbar.contact`), route: '/contact-me' },
  ];

  useEffect(() => {
    const updateScrollY = () => {
      setScrollY(window.pageYOffset);
    };
    const watchScroll = () => {
      window.addEventListener('scroll', updateScrollY);
    };
    watchScroll();

    return () => {
      window.removeEventListener('scroll', updateScrollY);
    };
  }, []);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // Temp to fake loading
  useEffect(() => {
    home.fetchImages();
    // setTimeout(() => (home.isAppLoading = false), 1000);
  }, [home]);

  // Update width on resize
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return home.isAppLoading ? (
    <Spinner />
  ) : (
    <Container>
      <header>
        <Navbar width={width} navLinks={navLinks} />
        <MainSlider imagesArray={home.sliderImages} />
      </header>
      <Main>
        <MainHeading>{t(`welcome.heading`)}</MainHeading>
        <FirstSection>
          <CVImage>
            <ImageAnimation
              image={require('../assets/images/valerio_scisci.jpg')}
              imageAlt={'Valerio Scisci'}
              animationDirection={'BottomToTop'}
              animationX={'9.5em'}
              animationDuration={0.6}
              showOnPhone={true}
            />
          </CVImage>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paragraph color={'black'}>{t(`welcome.introParagraph`)}</Paragraph>
            <Button
              buttonText={t(`welcome.introButton`)}
              iconRight={<FaArrowRight size={'1.2em'} />}
              arrowAnimation={true}
              style={{ margin: '1em auto' }}
            ></Button>
          </div>
        </FirstSection>
        <SecondSection>
          <SecondHeading>"TEST"</SecondHeading>
          <Paragraph color={'white'}>{t(`welcome.secondParagraph`)}</Paragraph>
          <Button buttonText={t(`welcome.secondButton`)}></Button>
          <ImageAnimation
            image={require('../assets/images/pc.jpg')}
            imageAlt={'Smart'}
            imageStyle={{
              bottom: '-2.5em',
              left: '-5em',
              width: '15em',
              height: '15em',
              borderRadius: '1.5em',
              position: 'absolute',
            }}
            animationDirection={'LeftToRight'}
            animationX={'5.5em'}
            animationRotation={'-10deg'}
            animationDuration={1}
          />
        </SecondSection>
        <KnownTechSection width={width} />
        <ParallaxSection scrollY={scrollY} />
        <p style={{ height: '500px', width: '100%', backgroundColor: 'white' }}>
          Portfolio anicipation
        </p>
        <p style={{ height: '500px', width: '100%', backgroundColor: 'black' }}>
          Blog Articles
        </p>
        <p style={{ height: '500px', width: '100%', backgroundColor: 'white' }}>
          Instagram section
        </p>
        <p style={{ height: '500px', width: '100%', backgroundColor: 'black' }}>
          Companies I've worked for
        </p>
      </Main>
      <footer
        style={{ height: '500px', width: '100%', backgroundColor: 'white' }}
      >
        footer
      </footer>
    </Container>
  );
});

export default HomeScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
`;

const MainHeading = styled.h1`
  color: ${(props) => props.theme.colors.textColorBlack};
  font-family: Corben;
  text-transform: uppercase;
  background: url(${brush});
  background-repeat: no-repeat;
  background-size: 100% 95%;
  padding: 0.2em 0;
  text-align: center;
  margin-bottom: 2em;
`;

const FirstSection = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  padding: 1em;

  @media (min-width: 768px) {
    padding: 0 5em;
  }
`;

const CVImage = styled.div`
  & img {
    border-radius: 0.3em;
    margin-right: 0em;
    margin-top: 9.5em;
    width: 100%;
    height: 30em;
    object-fit: cover;
    object-position: center;
    -webkit-box-shadow: inset 0px -10px 5px -3px
      ${(props) => props.theme.colors.background};
    -moz-box-shadow: inset 0px -10px 5px -3px
      ${(props) => props.theme.colors.background};
    box-shadow: inset 0px -10px 5px -3px
      ${(props) => props.theme.colors.background};

    @media (min-width: 768px) {
      width: 20em;
      margin-right: 3em;
      height: auto;
    }
  }
`;

const Paragraph = styled.p<{ color: string }>`
  color: ${(props) =>
    props.color === 'white'
      ? props.theme.colors.textColorWhite
      : props.theme.colors.textColorBlack};
  font-family: Corben;
  font-size: 1em;
`;

const SecondSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.backgroundLight};
  margin-top: 5em;
  padding: 5em;
  clip-path: polygon(50% 15%, 100% 0, 100% 100%, 0 200%, 0 0);
`;

const SecondHeading = styled.h1`
  color: ${(props) => props.theme.colors.textColorWhite};
  font-family: Corben;
  text-transform: uppercase;
  padding: 0.2em 0;
  text-align: center;
  margin-bottom: 2em;
`;
