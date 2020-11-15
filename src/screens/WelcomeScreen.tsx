import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import CircleLoader from 'react-spinners/CircleLoader';
import { Navbar } from '../components/Navbar';

const HomeScreen = observer(() => {
  const { home } = useStores();
  const [width, setWidth] = useState(window.innerWidth); // width state
  const navLinks = [
    { name: 'home', route: '/' },
    { name: 'about', route: '/about' },
    { name: 'portfolio', route: '/portfolio' },
    { name: 'contact me', route: '/contact' },
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
