import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import { Navbar } from '../components/navigation/Navbar';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MainSlider } from '../components/welcomePage/Slider';
import brush from '../assets/images/homepage/brush.png';
import { Button } from '../components/common/Button';
import { FaArrowRight } from 'react-icons/fa';
import { ImageAnimation } from '../components/common/ImageAnimation';
import { ParallaxSection } from '../components/welcomePage/ParallaxSection';
import { KnownTechSection } from '../components/welcomePage/KnownTechSection';
import useScrollPosition from '@react-hook/window-scroll';
import { useWindowSize } from '../hooks/useWindowSize';
import { BlogSection } from '../components/welcomePage/BlogSection';
import { Paragraph } from '../components/common/Paragraph';
import { HeadingTitle } from '../components/common/HeadingTitle';
import { valerioTheme } from '../theme';
import { ReviewsSection } from '../components/welcomePage/ReviewsSection';
import { ContactForm } from '../components/welcomePage/ContactForm';

const HomeScreen: React.FC = observer((props) => {
  const { home } = useStores();
  const { t } = useTranslation();
  const [width] = useWindowSize();
  const scrollY = useScrollPosition(144);
  const navLinks = [
    { name: t(`navbar.home`), route: '/' },
    { name: t(`navbar.about`), route: '/about' },
    { name: t(`navbar.portfolio`), route: '/portfolio' },
    { name: t(`navbar.contact`), route: '/#ContactForm' },
  ];

  return (
    <Container>
      <header>
        <Navbar width={width} navLinks={navLinks} />
        <MainSlider imagesArray={home.sliderImages} />
      </header>
      <Main>
        <HeadingTitle
          style={{
            backgroundColor: valerioTheme.colors.background,
            background: ' url(' + brush + ')',
            backgroundRepeat: ' no-repeat',
            backgroundSize: ' 100% 95%',
            marginTop: 0,
          }}
        >
          {t(`welcome.heading`)}
        </HeadingTitle>
        Realizzo siti web e applicazioni viaggiando e documentando il tutto
        <FirstSection>
          <CVImage>
            <ImageAnimation
              image={require('../assets/images/homepage/valerio_scisci.jpg')}
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
            <Paragraph style={{ marginBottom: '0' }}>
              {t(`welcome.introParagraph`)}
            </Paragraph>
            <Button
              buttonText={t(`welcome.introButton`)}
              iconRight={<FaArrowRight size={'1.2em'} />}
              arrowAnimation={true}
              style={{ margin: '2em auto' }}
            ></Button>
          </div>
        </FirstSection>
        <SecondSection>
          <HeadingTitle style={{ marginTop: '4em' }} color={'white'}>
            SEZIONE DUE
          </HeadingTitle>
          <Paragraph color={'white'}>{t(`welcome.secondParagraph`)}</Paragraph>
          <Button
            buttonText={t(`welcome.secondButton`)}
            style={{ margin: '2em auto' }}
            onClickUrl={'#ContactForm'}
          ></Button>
          <ImageAnimation
            image={require('../assets/images/homepage/pc.jpg')}
            imageAlt={'Smart'}
            imageStyle={{
              bottom: '-2.5em',
              left: '-5em',
              width: '15em',
              height: '15em',
              borderRadius: '1.5em',
              position: 'absolute',
            }}
            animationDirection={'TopLeftToRight'}
            animationX={'5.5em'}
            animationRotation={'-10deg'}
            animationDuration={1}
          />
        </SecondSection>
        <KnownTechSection width={width} />
        <ParallaxSection scrollY={scrollY} />
        <BlogSection />
        {props.children}
        <ReviewsSection />
        <ContactForm width={width} />
      </Main>
      <footer
        style={{ height: '500px', width: '100%', backgroundColor: 'black' }}
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
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
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

const SecondSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.backgroundLight};
  margin-top: 5em;
  padding: 0 5em 5em 5em;
  clip-path: polygon(50% 10%, 100% 0, 100% 100%, 0 200%, 0 0);
`;
