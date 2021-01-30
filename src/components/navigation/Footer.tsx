import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import styled from 'styled-components';
import LogoImage from '../../assets/images/common/Logo.png';
import { Paragraph } from '../common/Paragraph';

const socialData = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/valerio-scisci/',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/valerioscisci/',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/valerioscisci',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/valerio.scisci/',
  },
  {
    name: 'Email',
    url: 'mailto:valerio.scisci94@gmail.com',
  },
];

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const contactColumnRef = useRef<HTMLDivElement>(null);

  let socialDataIcons: Array<{ [key: string]: React.ReactNode }> = [];

  if (contactColumnRef.current) {
    const divWidth = contactColumnRef.current.offsetWidth;
    let SOCIAL_ICON_WIDTH = divWidth / socialData.length;
    SOCIAL_ICON_WIDTH =
      SOCIAL_ICON_WIDTH - (divWidth * socialData.length) / 100;
    if (SOCIAL_ICON_WIDTH > 40) {
      SOCIAL_ICON_WIDTH = 40;
    }
    socialDataIcons.push(
      ...[
        {
          LinkedIn: <FaLinkedin size={SOCIAL_ICON_WIDTH} />,
        },
        { Instagram: <FaInstagram size={SOCIAL_ICON_WIDTH} /> },
        { GitHub: <FaGithub size={SOCIAL_ICON_WIDTH} /> },
        { Facebook: <FaFacebook size={SOCIAL_ICON_WIDTH} /> },
        {
          Email: <FaEnvelope size={SOCIAL_ICON_WIDTH} />,
        },
      ],
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <FooterColumn>
        <LogoContainer>
          <a href={'#'} rel={'noreferrer'}>
            <Logo src={LogoImage} />
          </a>
          <Paragraph color={'white'}>
            © {currentYear} {t('footer.copyright')}
          </Paragraph>
        </LogoContainer>
      </FooterColumn>
      <FooterColumn>
        <h5>{t('footer.usefulLinks')}</h5>
        <h5>{t('footer.policy')}</h5>
        <a href={'#'} rel={'noreferrer'}>
          {t('footer.privacyPolicy')}
        </a>
        <a href={'#'} rel={'noreferrer'}>
          {t('footer.cookiePolicy')}
        </a>
      </FooterColumn>
      <FooterColumn ref={contactColumnRef}>
        <h5>{t('footer.contactInformation')}</h5>
        <SocialContainer>
          {!!socialDataIcons.length &&
            socialData.map((social: { name: string; url: string }, i) => {
              return (
                <SocialLink
                  href={social.url}
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  {socialDataIcons[i][social.name]}
                </SocialLink>
              );
            })}
        </SocialContainer>
      </FooterColumn>
    </Container>
  );
};

const Container = styled.footer`
  display: block;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.backgroundDark};

  @media (min-width: 576px) {
    display: flex;
  }
`;

const FooterColumn = styled.div`
  color: ${(props) => props.theme.colors.textColorWhite};
  flex: 1;
  flex-direction: column;
  width: 32%;
  padding: 2em;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 13em;
  height: 4em;
  margin-bottom: 1.5em;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${() => (socialData.length + 1) * 50}px;
`;

const SocialLink = styled.a`
  width: calc(100 / ${(props) => socialData.length});
  color: ${(props) => props.theme.colors.textColorWhite};

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.theme.colors.primary};
  }
`;
