import React, { useEffect } from 'react';
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
import { StyledLink } from '../components/common/StyledLink';
import { FaNewspaper } from 'react-icons/fa';
import { valerioTheme } from '../theme';
import i18next from 'i18next';

const paragraphStyle = {
  padding: '1em 2em',
  width: '100%',
  zIndex: 1,
};

const linkStyle: React.CSSProperties = {
  margin: '1em 2em',
  borderRadius: '0.2em',
  padding: '1em',
  backgroundColor: valerioTheme.colors.backgroundDark,
  textAlign: 'center',
};

const newsIconStyle: React.CSSProperties = {
  verticalAlign: 'middle',
};

export const AboutScreen: React.FC = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('common.websiteName') + ' - ' + t('navbar.about');
  });

  return (
    <ScreenContainer mainSlider={false}>
      <Main>
        <HeadingContainer>
          <TopImage src={laptopImage} />
          <HeadingText>
            <HeadingTitle style={{ textAlign: 'center' }}>
              {t(`navbar.about`)}
            </HeadingTitle>
            <ParagraphDiv className={'topText'}>
              <Trans
                i18nKey="about.introText"
                components={{
                  Highlight: (
                    <Tooltip text={t('about.digitalNomad')} position={'top'} />
                  ),
                }}
              />
            </ParagraphDiv>
            <SecondParagraphCotainer>
              <Paragraph>
                {t('about.secondParagraph')} <RightImage src={degreeImage} />
              </Paragraph>
            </SecondParagraphCotainer>
          </HeadingText>
        </HeadingContainer>
        <SecondPartContainer>
          <Paragraph style={{ position: 'relative' }}>
            {t('about.thirdParagraph')}
          </Paragraph>

          <Paragraph style={{ position: 'relative' }}>
            {t('about.fourthParagraph')}
          </Paragraph>

          <RightImagetwo src={degreeImage} />
        </SecondPartContainer>

        <Paragraph style={paragraphStyle}>
          {t('about.fifthParagraph')}
        </Paragraph>

        <HeadingTitle style={{ padding: '0 2em' }}>
          {i18next.language === 'it' && t('about.TWDProject')}{' '}
          {t('common.websiteName')}{' '}
          {i18next.language === 'en' && t('about.TWDProject')}
        </HeadingTitle>

        <Paragraph style={paragraphStyle}>
          {t('about.TWDdescription')}
        </Paragraph>

        <BottomContainer>
          <BottomImage src={beerImage} />
          <BottomTextContainer>
            <Paragraph
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '2em',
                padding: '0 2em',
              }}
            >
              {t('about.sixthParagraph')}
            </Paragraph>
            <StyledLink
              color={'secondary'}
              href={
                'https://www.linkedin.com/pulse/top-5-cose-da-sapere-prima-di-diventare-un-nomade-digitale-scisci/'
              }
              target={'_blank'}
              hoverSpacing={false}
              style={linkStyle}
            >
              <FaNewspaper size={30} style={newsIconStyle} />
              <span>{' ' + t('about.linkedInArticle')}</span>
            </StyledLink>
            <Paragraph style={paragraphStyle}>
              {t('about.seventhParagraph')}
            </Paragraph>
          </BottomTextContainer>
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
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const TopImage = styled.img`
  width: 70%;
  background-size: contain;
  position: absolute;
  z-index: 0;
  opacity: 0.4;
  top: 35%;
  left: 0%;
  transform: translateY(-50%);

  @media (min-width: 992px) {
    width: 45%;
    height: 60%;
    position: relative;
    z-index: 1;
    opacity: 1;
    top: initial;
    left: initial;
    transform: translateY(0%);
  }
`;

const HeadingText = styled.div`
  width: 100%;
  z-index: 1;
  padding: 0 2em;

  & div.topText {
    margin-left: 25%;
    text-align: right;

    @media (min-width: 576px) {
      background-color: ${(props) => {
        return props.theme.colors.opacityBackgroundLight;
      }};
      padding: 1.5em;
      border-radius: 0.8em;
      -webkit-box-shadow: 16px 16px 50px 20px rgba(34, 40, 49, 0.5);
      box-shadow: 16px 16px 50px 20px rgba(34, 40, 49, 0.5);
    }

    @media (min-width: 992px) {
      margin-left: initial;
      text-align: initial;
    }
  }
`;

const RightImage = styled.img`
  display: none;
  background-size: contain;
  width: 50%;
  @media (min-width: 992px) {
    display: initial;
  }
`;

const RightImagetwo = styled.img`
  background-size: contain;
  width: 50%;
  position: absolute;
  z-index: 0;
  opacity: 0.4;
  top: 35%;
  right: 0%;
  transform: translateY(-50%);

  @media (min-width: 992px) {
    display: none;
  }
`;

const SecondParagraphCotainer = styled.div`
  & p {
    display: flex;
    align-items: center;
    margin: 3.5em;
    font-family: Manrope;
    font-size: 1.32em;
    text-align: center;
    line-height: 1.7em;

    @media (min-width: 992px) {
      margin: 2em 0;
    }
  }
`;

const SecondPartContainer = styled.div`
  position: relative;

  & p {
    padding: 1em 2em;
    width: 80%;
    z-index: 1;

    @media (min-width: 992px) {
      width: 100%;
    }
  }
`;

const BottomImage = styled.img`
  width: 45%;
  background-size: contain;
  align-self: center;
  margin-top: -5em;
  opacity: 0.3;
  margin-bottom: -5em;

  @media (min-width: 992px) {
    align-self: initial;
    margin-top: 0;
    opacity: 1;
    margin-bottom: 0;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row-reverse;
  }
`;

const BottomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ParagraphDiv = styled.div`
  font-family: Corben;
  font-size: 1em;
  word-spacing: 0.15em;
  letter-spacing: 0.02em;
  margin: 0;
  white-space: pre-wrap;
`;
