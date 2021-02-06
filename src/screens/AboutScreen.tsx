import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import brush from '../assets/images/homepage/brush.png';
import { HeadingTitle } from '../components/common/HeadingTitle';
import { valerioTheme } from '../theme';
import { ScreenContainer } from './ScreenContainer';

export const AboutScreen: React.FC = observer((props) => {
  const { t } = useTranslation();

  return (
    <ScreenContainer mainSlider={false}>
      <Main>
        <HeadingTitle
          style={{
            backgroundColor: valerioTheme.colors.background,
            background: ' url(' + brush + ')',
            backgroundRepeat: ' no-repeat',
            backgroundSize: ' 100% 95%',
            margin: 0,
          }}
        >
          {t(`welcome.heading`)}
        </HeadingTitle>
      </Main>
    </ScreenContainer>
  );
});

const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
`;
