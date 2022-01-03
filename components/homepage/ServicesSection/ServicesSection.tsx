import React from 'react';
import styled from 'styled-components';
import {
  FaBug,
  FaHandsHelping,
  FaHeadset,
  FaLaptopCode,
  FaMobileAlt,
} from 'react-icons/fa';
import { HeadingTitle } from '../../ui/HeadingTitle/HeadingTitle';
import { Paragraph } from '../../ui/Paragraph/Paragraph';
import { ImageAnimation } from '../../common/ImageAnimation/ImageAnimation';
import { url } from '../../../config/config';
import { TFunction } from 'next-i18next';

interface ServicesSectionProps {
  t: TFunction;
}
export const ServicesSection: React.FC<ServicesSectionProps> = ({ t }) => {
  const services = [
    {
      name: t('homepage:servicesSection.services.newWebsite.name'),
      description: t(
        'homepage:servicesSection.services.newWebsite.description',
      ),
      icon: <FaLaptopCode size={'5em'} />,
    },
    {
      name: t('homepage:servicesSection.services.newMobileApp.name'),
      description: t(
        'homepage:servicesSection.services.newMobileApp.description',
      ),
      icon: <FaMobileAlt size={'5em'} />,
    },
    {
      name: t('homepage:servicesSection.services.helpYourTeam.name'),
      description: t(
        'homepage:servicesSection.services.helpYourTeam.description',
      ),
      icon: <FaHandsHelping size={'5em'} />,
    },
    {
      name: t('homepage:servicesSection.services.one2one.name'),
      description: t('homepage:servicesSection.services.one2one.description'),
      icon: <FaHeadset size={'5em'} />,
    },
    {
      name: t('homepage:servicesSection.services.codeReview.name'),
      description: t(
        'homepage:servicesSection.services.codeReview.description',
      ),
      icon: <FaBug size={'4em'} />,
    },
  ];

  return (
    <Container>
      <HeadingTitle
        color={'white'}
        style={{
          position: 'relative',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          margin: '2em 0 0 0',
        }}
      >
        {t('homepage:servicesSection.title')}
      </HeadingTitle>
      <ServicesList>
        {services.map((service) => {
          return (
            <Sevice key={service.name}>
              {service.icon}
              <ServiceTitle>{service.name}</ServiceTitle>
              <Paragraph style={{ fontFamily: 'Manrope', fontSize: '1.3em' }}>
                {service.description}
              </Paragraph>
            </Sevice>
          );
        })}
      </ServicesList>
      <ImageAnimation
        image={`${url}images/homepage/world.jpg`}
        imageAlt={'The world'}
        imageStyle={{
          bottom: '-2.5em',
          right: '-5em',
          width: '15em',
          height: '15em',
          borderRadius: '1.5em',
          position: 'absolute',
        }}
        animationDirection={'TopRightToLeft'}
        animationX={'5.5em'}
        animationRotation={'10deg'}
        animationDuration={1}
        boxShadow={true}
      />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.backgroundDark};
  /* background by SVGBackgrounds.com */
  background-image: url(${url}/images/homepage/services.svg);
  background-attachment: fixed;
  background-size: cover;
  position: relative;
`;

const ServicesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0 0 2em 0;
  max-width: 1200px;
`;

const Sevice = styled.li`
  text-align: center;
  display: flex;
  width: calc(100% - 3em);
  height: auto;
  min-height: 20em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #fff;
  margin: 3em 1.5em;
  padding: 1em;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: 768px) {
    margin: 3em 1em;
    width: calc(50% - 4em);
  }
`;

const ServiceTitle = styled.h4`
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textColorBlack};
  font-family: Corben;
  font-size: 1.3em;
  word-spacing: 0.5em;
  letter-spacing: 0.1em;
`;
