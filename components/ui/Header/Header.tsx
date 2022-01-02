import { TFunction } from 'next-i18next';
import React from 'react';
import { MainSlider } from '../../homepage/Slider/Slider';
import { Navbar } from '../Navbar/Navbar';
import { useRouter } from 'next/router';

interface Props {
  width: number;
  mainSlider?: boolean;
  t: TFunction;
}

export const Header: React.FC<Props> = ({ width, mainSlider = true, t }) => {
  const router = useRouter();

  const navLinks = [
    { name: t('common:navbar.home'), route: `/${router.locale}` },
    { name: t('common:navbar.about'), route: `/${router.locale}/about` },
    {
      name: t('common:navbar.portfolio'),
      route: `/${router.locale}/#Portfolio`,
    },
    {
      name: t('common:navbar.contact'),
      route: `/${router.locale}/#ContactForm`,
    },
    {
      name: t('newsletter.subscribeButton'),
      route: `/${router.locale}/#Newsletter`,
    },
  ];

  return (
    <header>
      <Navbar width={width} navLinks={navLinks} router={router} />
      {mainSlider && <MainSlider t={t} />}
    </header>
  );
};
