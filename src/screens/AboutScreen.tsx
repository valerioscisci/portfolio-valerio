import React from 'react';
import { observer } from 'mobx-react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { HeadingTitle } from '../components/common/HeadingTitle';
import { ScreenContainer } from './ScreenContainer';
import laptopImage from '../assets/images/about/laptop.png';
import degreeImage from '../assets/images/about/laurea.png';
import beerImage from '../assets/images/about/beer.png';
import { Paragraph } from '../components/common/Paragraph';
import { Tooltip } from '../components/common/Tooltip';

const paragraphStyle = {
  padding: '1em 2em',
  width: '100%',
};

export const AboutScreen: React.FC = observer((props) => {
  const { t } = useTranslation();

  return (
    <ScreenContainer mainSlider={false}>
      <Main>
        <HeadingContainer>
          <TopImage src={laptopImage} />
          <HeadingText>
            <HeadingTitle style={{ textAlign: 'center' }}>
              {t(`navbar.about`)}
            </HeadingTitle>
            <Paragraph>
              <Trans
                i18nKey="about.introText"
                components={{
                  Highlight: (
                    <Tooltip text={t('about.digitalNomad')} position={'top'} />
                  ),
                }}
              ></Trans>
            </Paragraph>
            <Paragraph
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '2em',
              }}
            >
              {t('about.secondParagraph')} <RightImage src={degreeImage} />
            </Paragraph>
          </HeadingText>
        </HeadingContainer>
        <Paragraph style={paragraphStyle}>
          {t('about.thirdParagraph')}
        </Paragraph>

        <Paragraph style={paragraphStyle}>
          {t('about.fourthParagraph')}
        </Paragraph>

        <Paragraph style={paragraphStyle}>
          {t('about.fifthParagraph')}
        </Paragraph>

        <HeadingTitle>
          {t('about.TWDProject') + t('common.websiteName')}
        </HeadingTitle>

        <Paragraph style={paragraphStyle}>
          {t('about.TWDdescription')}
        </Paragraph>

        <BottomContainer>
          <BottomImage src={beerImage} />
          <Paragraph
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '2em',
              padding: '0 2em',
            }}
          >
            {t('about.secondParagraph')}
          </Paragraph>
        </BottomContainer>

        <Paragraph style={paragraphStyle}>{t('about.conclusion')}</Paragraph>
      </Main>
    </ScreenContainer>
  );
});

const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopImage = styled.img`
  width: 45%;
  background-size: contain;
`;

const HeadingText = styled.div`
  width: 100%;

  padding: 0 2em;
`;

const RightImage = styled.img`
  width: 50%;
  background-size: contain;
`;

const BottomImage = styled.img`
  width: 45%;
  background-size: contain;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
