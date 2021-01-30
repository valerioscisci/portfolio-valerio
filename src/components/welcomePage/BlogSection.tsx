import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ReactCursorPosition, { INTERACTIONS } from 'react-cursor-position';
import { ComingSoonText } from './ComingSoonText';
import VisibilitySensor from 'react-visibility-sensor';
import comingSoon from '../../assets/images/homepage/coming_soon.svg';
import { Paragraph } from '../common/Paragraph';
import { HeadingTitle } from '../common/HeadingTitle';
import { Button } from '../common/Button';
import { FaArrowDown } from 'react-icons/fa';

export const BlogSection: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const words = t('blogSection.comingSoon').split(' ');

  return (
    <VisibilitySensor
      partialVisibility
      active={true}
      onChange={(isVisibleNewValue: boolean) => {
        setIsVisible(isVisibleNewValue);
      }}
    >
      <Container>
        <HeadingTitle
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            margin: '2em 0 0 0',
          }}
        >
          {t('blogSection.title')}
        </HeadingTitle>
        {isVisible && (
          <ReactCursorPosition
            activationInteractionMouse={INTERACTIONS.HOVER}
            hoverDelayInMs={0}
            hoverOffDelayInMs={0}
          >
            <ComingSoonText words={words} />
          </ReactCursorPosition>
        )}
        <BlogDescription>
          <Paragraph style={{ textTransform: 'uppercase' }}>
            {t('blogSection.description')}
          </Paragraph>
          <Button
            iconLeft={<FaArrowDown size={'1.2em'} />}
            iconRight={<FaArrowDown size={'1.2em'} />}
            buttonText={t(`blogSection.subscribe`)}
            onClickUrl={'#'}
            onClickUrlNewPage={false}
            gradientBackground={true}
            arrowAnimation={true}
            style={{ margin: '1em auto 0 auto' }}
          ></Button>
        </BlogDescription>
      </Container>
    </VisibilitySensor>
  );
};

const Container = styled.section`
  width: 100%;
  height: 50em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  background-image: url(${comingSoon});
  background-size: 30%;
  background-position: 10% 50%;
  background-repeat: no-repeat;
  overflow: hidden;

  @media (min-width: 576px) {
    height: 40em;
  }
`;

const BlogDescription = styled.div`
  margin-top: auto;
  text-align: center;
  padding: 3em;
  white-space: pre-line;
`;
