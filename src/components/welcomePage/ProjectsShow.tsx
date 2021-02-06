import React, { useState } from 'react';
import styled from 'styled-components';
import { PortfolioProject } from '../../types';
import { DotGroup } from '../common/DotGroup';
import { ProjectSlide } from './ProjectSlide';

export interface ProjectsShowProps {
  width: number;
  projects: Array<PortfolioProject>;
  noProjects?: boolean;
}

export const ProjectsShow: React.FC<ProjectsShowProps> = ({
  width,
  projects,
  noProjects = false,
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
  flex-direction: column-reverse;
  justify-content: flex-end;
  flex: 1;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

const DotGroupContainer = styled.div`
  padding: 1em 0;

  @media (min-width: 768px) {
    padding: 1em 0 0 0;
  }
`;
