import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import { Navbar } from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MainSlider } from '../components/Slider';
import { Spinner } from '../components/Spinner';

const HomeScreen = observer(() => {
  const { home } = useStores();
  const [width, setWidth] = useState(window.innerWidth); // width state
  const { t } = useTranslation();

  const navLinks = [
    { name: t(`navbar.home`), route: '/' },
    { name: t(`navbar.about`), route: '/about' },
    { name: t(`navbar.portfolio`), route: '/portfolio' },
    { name: t(`navbar.contact`), route: '/contact-me' },
  ];

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
  });

  return home.isAppLoading ? (
    <Spinner />
  ) : (
    <Container>
      <Navbar width={width} navLinks={navLinks} />
      <MainSlider imagesArray={home.sliderImages} />
    </Container>
  );
});

export default HomeScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
