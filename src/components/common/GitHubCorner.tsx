import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const GitHubCorner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Corner
      href={'https://github.com/valerioscisci/portfolio-valerio'}
      rel={'noreferrer'}
      target={'_blank'}
    >
      {t('githubCorner')}
      <FaGithub size={'1.1em'} style={{ marginLeft: '0.3em' }} />
    </Corner>
  );
};

const Corner = styled.a`
  position: fixed;
  background-color: ${(props) => props.theme.colors.backgroundDark};
  color: ${(props) => props.theme.colors.textColorWhite};
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 4.5em;
  right: -5.5em;
  padding: 0.5em 5em;
  transform: rotate(-45deg);
  font-size: 0.7em;
  text-decoration: none;
`;
