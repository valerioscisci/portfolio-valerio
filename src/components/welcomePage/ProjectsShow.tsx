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
      <DotGroup
        slidesNumber={projects.length}
        activeIndex={currentShownProject}
        onDotClick={setCurrentShownProject}
      />
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
