import React from 'react';
import styled from 'styled-components';
import { portfolioProject } from '../types';
import { ProjectSlide } from './ProjectSlide';

export interface ProjectsShowProps {
  projects: Array<portfolioProject>;
  noProjects?: boolean;
}

export const ProjectsShow: React.FC<ProjectsShowProps> = ({
  projects,
  noProjects = false,
}) => {
  return (
    <Container>
      {projects.map((projectDoneWithTechX, i) => {
        return (
          <ProjectSlide
            key={i}
            project={projectDoneWithTechX}
            noProjects={noProjects}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;
