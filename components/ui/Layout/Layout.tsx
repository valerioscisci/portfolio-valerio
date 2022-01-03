import React from 'react';
import styled from 'styled-components';
// import { GitHubCorner } from '../../../src/components/common/GitHubCorner';
import { useWindowSize } from '../../../hooks/useWindowSize';
// import { GoTop } from '../../../src/components/common/GoTop';
// import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import { valerioTheme } from '../../../pages/_app';
import { Header } from '../Header/Header';
import { TFunction } from 'next-i18next';
import { Footer } from '../Footer/Footer';
// import { StyledLink } from '../../../src/components/common/StyledLink';

interface LayoutProps {
  mainSlider?: boolean;
  t: TFunction;
}

export const Layout: React.FC<LayoutProps> = ({ mainSlider, t, ...props }) => {
  const [width] = useWindowSize();

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
      <Header width={width} mainSlider={mainSlider} t={t} />
      {props.children}
      <Footer t={t} />
      {/* {width > 768 && <GitHubCorner />}
      <GoTop />
      <CookieConsent
        enableDeclineButton
        location={'bottom'}
        buttonText={t('footer.cookieConsent')}
        declineButtonText={t('footer.cookieConsentDecline')}
        cookieName={'googleAnalytics'}
        style={cookieBarStyle}
        buttonStyle={buttonAcceptStyle}
        declineButtonStyle={declineButtonStyle}
        expires={150}
        onAccept={() => {
          // set cookie
          // home.cookieConsent = true;
        }}
        onDecline={() => {
          // set cookie
          // home.cookieConsent = false;
        }}
      >
        {t('footer.cookieConsentText')}
        <span style={{ fontSize: '10px' }}>
          <StyledLink href={'#'} color={'white'} hoverSpacing={false}>
            {' ' + t('footer.cookiePolicy')}
          </StyledLink>
        </span>
      </CookieConsent> */}
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
