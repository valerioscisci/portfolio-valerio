import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../../hooks/useWindowSize';
import CookieConsent from 'react-cookie-consent';
import { valerioTheme } from '../../../pages/_app';
import { Header } from '../Header/Header';
import { TFunction } from 'next-i18next';
import { Footer } from '../Footer/Footer';
import { GitHubCorner } from '../../common/GitHubCorner/GitHubCorner';
import { GoTop } from '../../common/GoTop/GoTop';
import { StyledLink } from '../../common/StyledLink/StyledLink';
import { NextRouter } from 'next/router';

interface LayoutProps {
  width: number;
  mainSlider?: boolean;
  router: NextRouter;
  t: TFunction;
}

export const Layout: React.FC<LayoutProps> = ({
  mainSlider,
  router,
  width,
  t,
  ...props
}) => {
  const cookieBarStyle = {
    background: valerioTheme.colors.backgroundDark,
    width: '80%',
    marginLeft: '2%',
    borderTopRightRadius: '1em',
    borderTopLeftRadius: '1em',
    fontFamily: 'Corben',
    fontSize: '0.8em',
  };

  const buttonAcceptStyle = {
    color: valerioTheme.colors.textColorBlack,
    background: valerioTheme.colors.secondary,
    borderRadius: '0.2em',
    fontFamily: 'Corben',
    paddingTop: 0,
  };

  const declineButtonStyle = {
    color: valerioTheme.colors.textColorWhite,
    background: valerioTheme.colors.backgroundDark,
    borderColor: valerioTheme.colors.textColorWhite,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '0.2em',
    fontFamily: 'Corben',
    paddingTop: 0,
  };

  return (
    <Container>
      <Header width={width} mainSlider={mainSlider} t={t} router={router} />
      {props.children}
      <Footer t={t} />
      {width > 768 && <GitHubCorner t={t} />}
      <GoTop />
      <CookieConsent
        enableDeclineButton
        location={'bottom'}
        buttonText={t('common:footer.cookieConsent')}
        declineButtonText={t('common:footer.cookieConsentDecline')}
        cookieName={'googleAnalytics'}
        style={cookieBarStyle}
        buttonStyle={buttonAcceptStyle}
        declineButtonStyle={declineButtonStyle}
        expires={150}
        onAccept={() => {
          // TODO: set cookie
          // home.cookieConsent = true;
        }}
        onDecline={() => {
          // TODO: set cookie
          // home.cookieConsent = false;
        }}
      >
        {t('common:footer.cookieConsentText')}
        <span style={{ fontSize: '10px' }}>
          <StyledLink href={'#'} color={'white'} hoverSpacing={false}>
            {' ' + t('common:footer.cookiePolicy')}
          </StyledLink>
        </span>
      </CookieConsent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;
