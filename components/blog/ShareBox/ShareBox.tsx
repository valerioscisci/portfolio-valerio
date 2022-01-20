import { TFunction } from 'next-i18next';
import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import styled from 'styled-components';
import { url as source } from '../../../config/config';

export interface ShareBoxProps {
  url: string;
  title: string;
  description: string;
  t: TFunction;
}

export const ShareBox: React.FC<ShareBoxProps> = ({
  url,
  title,
  description,
  t,
}) => {
  return (
    <Wrapper>
      <Container>
        <strong>{t('blog:shareOn')}:</strong>
      </Container>
      <Container>
        <FacebookShareButton url={url} quote={description} title={title}>
          <FacebookIcon size={32} round={false} borderRadius={10} />
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={description}
          source={source}
        >
          <LinkedinIcon size={32} round={false} borderRadius={10} />
        </LinkedinShareButton>
        <WhatsappShareButton url={url} title={title} separator={' | '}>
          <WhatsappIcon size={32} round={false} borderRadius={10} />
        </WhatsappShareButton>
        <TelegramShareButton title={title} url={url}>
          <TelegramIcon size={32} round={false} borderRadius={10} />
        </TelegramShareButton>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 0.7em;
`;
