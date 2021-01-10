import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { portfolioProject } from '../types';
import { ProjectSlide } from './ProjectSlide';

export interface ProjectsShowProps {
  width: number;
  projects: Array<portfolioProject>;
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
      <DotGroup>
        {projects.length > 1 &&
          projects.map((projectDoneWithTechX, i) => {
            return (
              <Dot key={i}>
                <DotButton
                  active={currentShownProject === i}
                  onClick={() => {
                    setCurrentShownProject(i);
                  }}
                ></DotButton>
              </Dot>
            );
          })}
      </DotGroup>
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

const DotGroup = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 3em;
  padding: 0;
  margin: 0;
  z-index: 99;
`;

const Dot = styled.li`
  list-style: none;
`;

const DotButton = styled.button<{ active: boolean }>`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 0 0.7em;
  outline-style: none;
  outline-width: 0;
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  -webkit-box-shadow: 0px 0px 0.5px 3px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 0.5px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 0.5px 3px rgba(0, 0, 0, 0.2);

  -webkit-transition: background-color 0.2s ease-out,
    -webkit-transform 0.3s cubic-bezier(0.8, 1.35, 0.75, 1.45);
  transition: background-color 0.2s ease-out,
    -webkit-transform 0.3s cubic-bezier(0.8, 1.35, 0.75, 1.45);
  transition: transform 0.3s;

  @media (min-width: 1200px) {
    width: 1.2em;
    height: 1.2em;
  }

  ${(props) =>
    props.active
      ? css`
          transform: scale(1.5);
          background-color: ${(props) => props.theme.colors.secondary};

          -webkit-box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
          -moz-box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
          box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.2);
        `
      : css`
          &:hover {
            transform: scale(1.3);
          }
        `};
`;
