import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TechList } from './TechList';
import { useStores } from '../hooks/useStores';
import { Slideshow } from './Slideshow';
import { PortfolioProject } from '../types';
import { HeadingTitle } from './HeadingTitle';
import { valerioTheme } from '../theme';

interface KnownTechSectionProps {
  width: number;
}

export const KnownTechSection: React.FC<KnownTechSectionProps> = ({
  width,
}) => {
  const { home } = useStores();
  const { t } = useTranslation();
  const [selectedTech, setSelectedTech] = useState<string>('');

  const onTechChange = useCallback(
    (newTech: string) => {
      setSelectedTech(newTech);
    },
    [setSelectedTech],
  );

  const projectsDoneWithTechX: Array<PortfolioProject> = home.portfolioImages.filter(
    (portfolioImage) => {
      return portfolioImage.madeWith.includes(selectedTech);
    },
  );

  return (
    <section
      style={{
        padding: '4em 0 2em 0',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: valerioTheme.colors.background,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <SectionHeader>
        <HeadingTitle style={{ marginBottom: '0' }}>
          {t(`knownTechs.heading`)}
        </HeadingTitle>{' '}
        <TechName key={selectedTech}>
          <em>{selectedTech}</em>
        </TechName>
        {width > 768 && <SectionSeparator />}
      </SectionHeader>
      <Section>
        <SideMenu>
          <TechList onTechChange={onTechChange} />
        </SideMenu>
        {width < 768 && <SectionSeparator />}
        {!!projectsDoneWithTechX.length ? (
          <Slideshow
            width={width}
            key={selectedTech}
            projects={projectsDoneWithTechX}
          />
        ) : (
          <Slideshow
            width={width}
            key={selectedTech}
            noProjects={true}
            projects={[
              {
                alt: t('knownTechs.noProjects'),
                img: require('../assets/images/portfolio/no_projects.svg'),
                madeWith: [selectedTech],
              },
            ]}
          />
        )}
      </Section>
    </section>
  );
};

const SectionHeader = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  flex-direction: column;
  text-align: center;
`;

const Section = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
  }
`;

const SideMenu = styled.div`
  height: 10em;
  width: 100%;

  @media (min-width: 768px) {
    height: 100%;
    width: 20%;
  }

  @media (min-width: 992px) {
    height: 100%;
    width: 20%;
  }
`;

const TechName = styled.div`
  /* ----------------------------------------------
* Generated by Animista on 2020-12-29 22:25:54
* Licensed under FreeBSD License.
* See http://animista.net/license for more info. 
* w: http://animista.net, t: @cssanimista
* ---------------------------------------------- */

  /**
* ----------------------------------------
* animation jello-horizontal
* ----------------------------------------
*/
  @-webkit-keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }

  -webkit-animation: jello-horizontal 0.5s both;
  animation: jello-horizontal 0.5s both;

  color: ${(props) => props.theme.colors.secondary};
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
    1px 1px 1px rgba(0, 0, 0, 0.1);

  font-family: Corben;
  text-transform: uppercase;
  font-size: 2em;
  margin-top: -0.5em;
`;

const SectionSeparator = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`;
