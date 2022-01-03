import React from 'react';
import styled from 'styled-components';
import brush from '/public/images/homepage/brush.png';
// import { ParallaxSection } from '../components/welcomePage/ParallaxSection';
// import { KnownTechSection } from '../components/welcomePage/KnownTechSection';
// import { BlogSection } from '../components/welcomePage/BlogSection';
// import { Paragraph } from '../components/common/Paragraph';
// import { valerioTheme } from '../theme';
// import { ReviewsSection } from '../components/welcomePage/ReviewsSection';
// import { ContactForm } from '../components/welcomePage/ContactForm';
// import { SubHeading } from '../components/common/SubHeading';
// import { ServicesSection } from '../components/welcomePage/ServicesSection';
// import { NewsletterForm } from '../components/common/NewsletterForm';
import { Layout } from '../components/ui/Layout/Layout';
import { useWindowSize } from '../hooks/useWindowSize';
import Seo from '../components/common/Seo/Seo';
import { GetStaticProps } from 'next/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { valerioTheme } from './_app';
import { HeadingTitle } from '../components/ui/HeadingTitle/HeadingTitle';
import { SubHeading } from '../components/homepage/SubHeading/SubHeading';
import { ImageAnimation } from '../components/common/ImageAnimation/ImageAnimation';
import { Paragraph } from '../components/ui/Paragraph/Paragraph';
import { Button } from '../components/ui/Button/Button';
import { FaArrowRight } from 'react-icons/fa';
import { url } from '../config/config';
import { KnownTechSection } from '../components/homepage/KnownTechSection/KnownTechSection';
import { useRouter } from 'next/router';

export default function HomeScreen() {
  const { t } = useTranslation(['homepage', 'common']);
  const router = useRouter();

  const [width] = useWindowSize();

  return (
    <Layout t={t} width={width} router={router}>
      <Seo
        pageTitle={t('homepage:metadata.title')}
        description={t('homepage:metadata.description')}
      />
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
          {t(`common:websiteName`)}
        </HeadingTitle>
        <SubHeading style={{ marginBottom: '4em' }}>
          {t('homepage:subHeading')}
        </SubHeading>
        <FirstSection>
          <CVImage>
            <ImageAnimation
              image={`${url}/images/homepage/valerio_scisci.jpg`}
              imageAlt={'Valerio Scisci'}
              animationDirection={'BottomToTop'}
              animationX={'9.5em'}
              animationDuration={0.6}
              showOnPhone={true}
            />
          </CVImage>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paragraph style={{ marginBottom: '0' }}>
              {t(`homepage:introParagraph`)}
            </Paragraph>
            <Button
              buttonText={t(`homepage:introButton`)}
              iconRight={<FaArrowRight size={'1.2em'} />}
              arrowAnimation={true}
              style={{ margin: '2em auto' }}
              onClickUrl={'/about'}
            />
          </div>
        </FirstSection>
        <SecondSection>
          <HeadingTitle style={{ marginTop: '4em' }} color={'white'}>
            {t(`homepage:secondParagraphTitle`)}
          </HeadingTitle>
          <Paragraph
            color={'white'}
            style={{
              textAlign: 'justify',
            }}
          >
            {t(`homepage:secondParagraph`)}
          </Paragraph>
          <Button
            buttonText={t(`common:contactMe`)}
            style={{ margin: '2em auto' }}
            onClickUrl={'#ContactForm'}
          ></Button>
          <ImageAnimation
            image={`${url}images/homepage/pc.jpg`}
            imageAlt={'Smart'}
            imageStyle={{
              bottom: '-2.5em',
              left: '-5em',
              width: '15em',
              height: '15em',
              borderRadius: '1.5em',
              position: 'absolute',
            }}
            animationDirection={'TopLeftToRight'}
            animationX={'5.5em'}
            animationRotation={'-10deg'}
            animationDuration={1}
            boxShadow={true}
          />
        </SecondSection>
        <KnownTechSection width={width} t={t} router={router} />
        {/*<ParallaxSection />
        <BlogSection />
        <ServicesSection />
        {props.children}
        <NewsletterForm />
        <ReviewsSection />
        <ContactForm width={width} /> */}
      </Main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['homepage', 'common'])),
    },
  };
};

const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
`;

const FirstSection = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  padding: 1em;

  @media (min-width: 768px) {
    padding: 0 5em;
  }
`;

const CVImage = styled.div`
  & img {
    border-radius: 0.3em;
    margin-right: 0em;
    margin-top: 9.5em;
    width: 100%;
    height: 30em;
    object-fit: cover;
    object-position: center;
    -webkit-box-shadow: inset 0px -10px 5px -3px
      ${(props) => props.theme.colors.background};
    -moz-box-shadow: inset 0px -10px 5px -3px
      ${(props) => props.theme.colors.background};
    box-shadow: inset 0px -10px 5px -3px
      ${(props) => props.theme.colors.background};

    @media (min-width: 768px) {
      width: 20em;
      margin-right: 3em;
      height: auto;
    }
  }
`;

const SecondSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.backgroundLight};
  margin-top: 5em;
  padding: 0 5em 5em 5em;
  clip-path: polygon(50% 10%, 100% 0, 100% 100%, 0 200%, 0 0);
`;
