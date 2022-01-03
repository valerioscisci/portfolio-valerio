import { TFunction } from 'next-i18next';
import { NextRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PortfolioProject, ProjectData } from '../../../../types';
import { DotGroup } from '../../../common/DotGroup/DotGroup';
import { ProjectSlide } from './ProjetSlide/ProjectSlide';

export interface ProjectsShowProps {
  width: number;
  projects: Array<PortfolioProject>;
  noProjects?: boolean;
  router: NextRouter;
  portfolioData: Array<ProjectData>;
  t: TFunction;
}

export const ProjectsShow: React.FC<ProjectsShowProps> = ({
  width,
  projects,
  noProjects = false,
  router,
  portfolioData,
  t,
}) => {
  const [currentShownProject, setCurrentShownProject] = useState<number>(0);

  return (
    <Container>
      {projects.map((projectDoneWithTechX, i) => {
        return (
          <ProjectSlide
            width={width}
            key={i}
            project={projectDoneWithTechX}
            noProjects={noProjects}
            activeProject={currentShownProject === i}
            router={router}
            portfolioData={portfolioData}
            t={t}
          />
        );
      })}
      <DotGroupContainer>
        <DotGroup
          slidesNumber={projects.length}
          activeIndex={currentShownProject}
          onDotClick={setCurrentShownProject}
        />
      </DotGroupContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  position: relative;
`;

const DotGroupContainer = styled.div`
  padding: 1em 0;

  @media (min-width: 768px) {
    padding: 1em 0 0 0;
  }
`;
