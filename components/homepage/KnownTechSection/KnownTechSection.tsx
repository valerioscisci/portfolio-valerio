import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { valerioTheme } from '../../../pages/_app';
import { HeadingTitle } from '../../ui/HeadingTitle/HeadingTitle';
import { url } from '../../../config/config';
import { TFunction } from 'next-i18next';
import { PortfolioProject, ProjectData } from '../../../types';
import { TechList } from './TechList/TechList';
import { ProjectsShow } from './ProjectsShow/ProjectsShow';
import { NextRouter } from 'next/router';
import getPortfolioDataHelper from '../../../helpers/homepage/getPortfolioDataHelper';
import { Spinner } from '../../common/Spinner/Spinner';
import { ErrorHandler } from '../../common/ErrorHandler/ErrorHandler';

const portfolioImages = [
  {
    alt: 'Aenl',
    img: `${url}images/portfolio/aenl.jpg`,
    madeWith: ['Bootstrap', 'Html5', 'Css3'],
  },
  {
    alt: 'Randy.gg',
    img: `${url}images/portfolio/randy.jpg`,
    madeWith: ['React', 'Html5', 'Css3', 'MongoDB', 'NextJS'],
  },
  {
    alt: 'Casa di Nicole',
    img: `${url}images/portfolio/casa_nicole.jpg`,
    madeWith: ['Wordpress', 'Html5', 'Css3', 'MySQL'],
  },
  {
    alt: 'Malta',
    img: `${url}images/portfolio/malta.jpg`,
    madeWith: ['Django', 'Html5', 'Css3', 'MySQL'],
  },
  {
    alt: 'Crossborder',
    img: `${url}images/portfolio/crossborder.jpg`,
    madeWith: ['Django', 'Html5', 'Css3', 'MongoDB'],
  },
  {
    alt: 'Recwind',
    img: `${url}images/portfolio/recwind.jpg`,
    madeWith: ['Django', 'Html5', 'Css3', 'SQLite'],
  },
  {
    alt: 'Portfolio',
    img: `${url}images/portfolio/portfolio.jpg`,
    madeWith: ['React', 'Html5', 'Sass', 'NextJS'],
  },
  {
    alt: 'Smartcontract',
    img: `${url}images/portfolio/smartcontract.jpg`,
    madeWith: ['Django', 'Html5', 'Css3', 'SQLite', 'Ethereum'],
  },
];

interface KnownTechSectionProps {
  width: number;
  t: TFunction;
  router: NextRouter;
}

export const KnownTechSection: React.FC<KnownTechSectionProps> = ({
  width,
  router,
  t,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [portfolioData, setPortfolioData] = useState<Array<ProjectData>>([]);
  const [portfolioDataError, setPortfolioDataError] = useState(false);

  const onTechChange = useCallback(
    (newTech: string) => {
      setSelectedTech(newTech);
    },
    [setSelectedTech],
  );

  const projectsDoneWithTechX: Array<PortfolioProject> = portfolioImages.filter(
    (portfolioImage) => {
      return portfolioImage.madeWith.includes(selectedTech);
    },
  );

  const getPortfolioData = useCallback(async () => {
    setPortfolioDataError(false);
    setLoading(true);
    const portfolioData = await getPortfolioDataHelper();
    if (portfolioData.message === 'success') {
      setPortfolioData(portfolioData.portfolioData);
    } else {
      setPortfolioDataError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getPortfolioData();
  }, []);

  return (
    <section
      id={'Portfolio'}
      style={{
        padding: '4em 0 2em 0',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: valerioTheme.colors.background,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {loading ? (
        <Spinner />
      ) : portfolioDataError ? (
        <ErrorHandler
          heading={'Error'}
          t={t}
          reloadButton={true}
          reloadFunction={getPortfolioData}
        >
          {t('homepage:knownTechs.projectsFetchingError')}
        </ErrorHandler>
      ) : (
        <>
          <SectionHeader>
            <HeadingTitle style={{ marginBottom: '0' }}>
              {t(`homepage:knownTechs.heading`)}
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
            <ProjectsShow
              width={width}
              key={selectedTech}
              projects={
                !!projectsDoneWithTechX.length && !!portfolioData.length
                  ? projectsDoneWithTechX
                  : [
                      {
                        alt: t('knownTechs.noProjects'),
                        img: `${url}images/portfolio/no_projects.svg`,
                        madeWith: [selectedTech],
                      },
                    ]
              }
              router={router}
              noProjects={
                !projectsDoneWithTechX.length || !portfolioData.length
              }
              portfolioData={portfolioData}
              t={t}
            />
          </Section>
        </>
      )}
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
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
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
