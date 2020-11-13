import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/useStores';
import CircleLoader from 'react-spinners/CircleLoader';
import Navbar from '../components/Navbar';

const HomeScreen = observer(() => {
  const { home } = useStores();

  useEffect(() => {
    setTimeout(() => (home.isAppLoading = false), 2000);
  }, [home]);

  return home.isAppLoading ? (
    <CircleLoader
      css={`
        margin: auto;
      `}
      size={150}
      color={'#CEE9CA'}
      loading={true}
    />
  ) : (
    <Navbar />
  );
});

export default HomeScreen;
