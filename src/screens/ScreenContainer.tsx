import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Footer } from '../components/navigation/Footer';
import { Header } from '../components/navigation/Header';
import { GitHubCorner } from '../components/common/GitHubCorner';
import { useWindowSize } from '../hooks/useWindowSize';
import { GoTop } from '../components/common/GoTop';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { valerioTheme } from '../theme';
import { useTranslation } from 'react-i18next';
import { StyledLink } from '../components/common/StyledLink';

type ScreenContainerProps = {
  mainSlider?: boolean;
};
export const ScreenContainer: React.FC<ScreenContainerProps> = observer(
  ({ mainSlider, ...props }) => {
    const { t } = useTranslation();
    const [width] = useWindowSize();

    return (
      <Container>
        <Header width={width} mainSlider={mainSlider} />
        {props.children}
        <Footer />
        {width > 768 && <GitHubCorner />}
        <GoTop />
        <CookieConsent
          debug={true}
          enableDeclineButton
          location={'bottom'}
          buttonText={t('footer.cookieConsent')}
          declineButtonText={t('footer.cookieConsentDecline')}
          cookieName={'googleAnalytics'}
          style={{ background: valerioTheme.colors.backgroundDark }}
          buttonStyle={{
            color: valerioTheme.colors.textColorBlack,
            fontSize: '13px',
          }}
          expires={150}
          onAccept={() => {
            alert('google start');
          }}
        >
          {t('footer.cookieConsentText')}
          <span style={{ fontSize: '10px' }}>
            <StyledLink href={'#'} color={'white'} hoverSpacing={false}>
              {' ' + t('footer.cookiePolicy')}
            </StyledLink>
          </span>
        </CookieConsent>
      </Container>
    );
  },
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;
