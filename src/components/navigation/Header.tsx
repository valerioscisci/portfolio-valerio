import React from 'react';
import { useStores } from '../../hooks/useStores';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../components/navigation/Navbar';
import { MainSlider } from '../../components/welcomePage/Slider';

interface Props {
  width: number;
  mainSlider?: boolean;
}

export const Header: React.FC<Props> = ({ width, mainSlider = true }) => {
  const { t } = useTranslation();
  const { home } = useStores();

  const navLinks = [
    { name: t('navbar.home'), route: '/' },
    { name: t('navbar.about'), route: '/about' },
    { name: t('navbar.portfolio'), route: '/portfolio' },
    { name: t('navbar.contact'), route: '/#ContactForm' },
    { name: t('newsletter.subscribeButton'), route: '/#Newsletter' },
  ];
  return (
    <header>
      <Navbar width={width} navLinks={navLinks} />
      {mainSlider && <MainSlider imagesArray={home.sliderImages} />}
    </header>
  );
};
