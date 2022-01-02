import { TFunction } from 'next-i18next';
import React from 'react';
import { MainSlider } from '../../homepage/Slider/Slider';
import { Navbar } from '../Navbar/Navbar';

interface Props {
  width: number;
  mainSlider?: boolean;
  t: TFunction;
}

export const Header: React.FC<Props> = ({ width, mainSlider = true, t }) => {
  const navLinks = [
    { name: t('common:navbar.home'), route: '/' },
    { name: t('common:navbar.about'), route: '/about' },
    { name: t('common:navbar.portfolio'), route: '/#Portfolio' },
    { name: t('common:navbar.contact'), route: '/#ContactForm' },
    { name: t('newsletter.subscribeButton'), route: '/#Newsletter' },
  ];
  return (
    <header>
      <Navbar width={width} navLinks={navLinks} />
      {mainSlider && <MainSlider t={t} />}
    </header>
  );
};
