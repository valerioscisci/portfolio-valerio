import { TFunction } from 'next-i18next';
import { NextRouter } from 'next/router';
import React from 'react';
import { MainSlider } from '../../homepage/Slider/Slider';
import { Navbar } from '../Navbar/Navbar';

interface Props {
  width: number;
  mainSlider?: boolean;
  router: NextRouter;
  t: TFunction;
}

export const Header: React.FC<Props> = ({
  width,
  mainSlider = true,
  router,
  t,
}) => {
  const navLinks = [
    { name: t('common:navbar.home'), route: `/${router.locale}` },
    { name: t('common:navbar.about'), route: `/${router.locale}/about` },
    { name: t('common:navbar.blog'), route: `/${router.locale}/blog` },
    {
      name: t('common:navbar.portfolio'),
      route: `/${router.locale}/#Portfolio`,
    },
    {
      name: t('common:navbar.contact'),
      route: `/${router.locale}/#ContactForm`,
    },
    {
      name: t('common:subscribe'),
      route: `/${router.locale}/#Newsletter`,
    },
  ];

  return (
    <header>
      <Navbar width={width} navLinks={navLinks} />
      {mainSlider && <MainSlider t={t} />}
    </header>
  );
};
