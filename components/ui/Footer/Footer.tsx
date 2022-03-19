import React, { useRef } from 'react';
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import styled from 'styled-components';
import { TFunction } from 'next-i18next';
import { Paragraph } from '../Paragraph/Paragraph';
import { url } from '../../../config/config';
import { StyledLink } from '../../common/StyledLink/StyledLink';

const socialData = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/valerio-scisci/',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/the_wanderer_developer/',
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

interface FooterProps {
  t: TFunction;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const contactColumnRef = useRef<HTMLDivElement>(null);

  let socialDataIcons: Array<{ [key: string]: React.ReactNode }> = [];

  if (contactColumnRef.current) {
    const divWidth = contactColumnRef.current.offsetWidth;
    let SOCIAL_ICON_WIDTH = divWidth / socialData.length;
    SOCIAL_ICON_WIDTH =
      SOCIAL_ICON_WIDTH - (divWidth * socialData.length) / 100;
    if (SOCIAL_ICON_WIDTH > 30) {
      SOCIAL_ICON_WIDTH = 30;
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
      ]
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <FooterColumn>
        <LogoContainer>
          <StyledLink href={'/'}>
            <Logo src={`${url}images/common/LogoWhite.png`} />
          </StyledLink>
          <Paragraph color={'white'}>
            © {currentYear} {t('common:websiteName')}
          </Paragraph>
          <Paragraph color={'white'} style={{ fontSize: '0.8em' }}>
            P.IVA: 08680010728
          </Paragraph>
          <Paragraph
            color={'white'}
            style={{ fontSize: '0.8em', textAlign: 'center', marginTop: '1em' }}
          >
            {t('common:shortDevDescription')}
          </Paragraph>
        </LogoContainer>
      </FooterColumn>
      <FooterColumn>
        <FooterTitle>{t('common:footer.usefulLinks')}</FooterTitle>
        <LinkContainer>
          <StyledLink href={'/blog'} color={'white'}>
            {t('common:blog')}
          </StyledLink>
        </LinkContainer>
        <LinkContainer>
          <StyledLink href={'/about'} color={'white'}>
            {t('common:navbar.about')}
          </StyledLink>
        </LinkContainer>
        <LinkContainer>
          <StyledLink
            href={'/#ContactForm'}
            color={'white'}
            scrollTo={'ContactForm'}
          >
            {t('common:contactMe')}
          </StyledLink>
        </LinkContainer>
      </FooterColumn>
      <FooterColumn>
        <FooterTitle>{t('common:footer.policy')}</FooterTitle>
        <LinkContainer>
          <StyledLink href={'#'} color={'white'}>
            {t('common:footer.privacyPolicy')}
          </StyledLink>
        </LinkContainer>
        <LinkContainer>
          <StyledLink href={'#'} color={'white'}>
            {t('common:footer.cookiePolicy')}
          </StyledLink>
        </LinkContainer>
      </FooterColumn>
      <FooterColumn ref={contactColumnRef}>
        <FooterTitle>{t('common:footer.contactInformation')}</FooterTitle>
        <SocialContainer>
          {!!socialDataIcons.length &&
            socialData.map((social: { name: string; url: string }, i) => {
              return (
                <SocialLink
                  key={social.name}
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
  background-color: ${(props) => props.theme.colors.backgroundDark};
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterColumn = styled.div`
  wisth: 100%;
  color: ${(props) => props.theme.colors.textColorWhite};
  flex: 1;
  flex-direction: column;
  padding: 1em 2em;

  @media (min-width: 768px) {
    width: 24%;
    padding: 2em;
  }
`;

const FooterTitle = styled.h5`
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.secondary};

  @media (min-width: 768px) {
    font-size: 1.3em;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
`;

const Logo = styled.img`
  width: 20em;
  margin-bottom: 1.5em;

  @media (min-width: 768px) {
    width: 15em;
  }
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

const LinkContainer = styled.span`
  margin: 0 0.8em;
  font-size: 1.3em;

  @media (min-width: 576px) {
    margin: 0.3em 0;
    display: block;
  }

  @media (min-width: 768px) {
    font-size: 1em;
  }
`;
