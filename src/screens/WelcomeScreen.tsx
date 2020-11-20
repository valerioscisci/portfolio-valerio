import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import CircleLoader from 'react-spinners/CircleLoader';
import { Navbar } from '../components/Navbar';
import { useTranslation } from 'react-i18next';

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
    setTimeout(() => (home.isAppLoading = false), 1000);
  }, [home]);

  // Update width on resize
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  return home.isAppLoading ? (
    <CircleLoader
      css={`
        margin: auto;
      `}
      size={150}
      color={'#222831'}
      loading={true}
    />
  ) : (
    <Navbar width={width} navLinks={navLinks} />
  );
});

export default HomeScreen;
