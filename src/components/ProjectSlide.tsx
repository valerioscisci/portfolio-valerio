import React from 'react';
import styled, { css } from 'styled-components';
import { ImageAnimation } from './ImageAnimation';
import { AutowriteText } from './AutowriteText';
import { projectData, portfolioProject } from '../types';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ConditionalWrapper } from './ConditionalWrapper';
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Button } from './Button';
import jsonDB from '../db/data.json';

export interface ProjectSlideProps {
  width: number;
  project: portfolioProject;
  noProjects: boolean;
  activeProject: boolean;
}

export const ProjectSlide: React.FC<ProjectSlideProps> = ({
  width,
  project,
  noProjects,
  activeProject,
}) => {
  const { t } = useTranslation();
  const projectData: projectData | undefined = jsonDB.portfolioData.find(
    (projectData) => {
      return projectData.projectName === project.alt;
    },
  );

  return (
    <ProjectContainer activeProject={activeProject}>
      <ProjectImageContainer>
        <ConditionalWrapper
          condition={!!projectData?.projectData.projectUrl}
          wrapper={(children) => (
            <a
              href={projectData?.projectData.projectUrl}
              rel={'noreferrer'}
              target={'_blank'}
            >
              {children}
              <ProjectImageOverlay>
                <FaExternalLinkAlt size={'2.5em'} />
                <VisitSite>{t('knownTechs.visitProject')}</VisitSite>
              </ProjectImageOverlay>
            </a>
          )}
        >
          <ImageAnimation
            image={project.img}
            imageAlt={project.alt}
            imageStyle={{
              width: '100%',
              height: noProjects ? '15em' : 'auto',
              opacity: 0,
              display: 'block',
            }}
            animationDirection={'FadeIn'}
            animationDuration={1.5}
            showOnPhone={true}
          />
        </ConditionalWrapper>
      </ProjectImageContainer>
      <ProjectDescription activeProject={activeProject}>
        <AutowriteText
          text={
            noProjects
              ? t('knownTechs.noProjectsTitle')
              : i18next.language === 'it'
              ? projectData?.projectData.titleIT
              : projectData?.projectData.titleEN
          }
          letterGenerationTiming={
            t('knownTechs.noProjectsDescription').length / 10
          }
          textStyle={{
            fontSize: '1.5em',
            fontFamily: 'Corben',
            fontWeight: 'bold',
            textAlign: 'center',
            minHeight: '4em',
            marginBottom: '1em',
          }}
          canStart={activeProject}
        />
        <AutowriteText
          text={
            noProjects
              ? t('knownTechs.noProjectsDescription')
              : i18next.language === 'it'
              ? projectData?.projectData.descriptionIT
              : projectData?.projectData.descriptionEN
          }
          letterGenerationTiming={
            t('knownTechs.noProjectsDescription').length / 50
          }
          textStyle={{
            fontFamily: 'Corben',
            minHeight: width < 576 ? undefined : '10em',
            flex: 1,
          }}
          canStart={activeProject}
        />
        <LinksContainer>
          {projectData?.projectData.portfolioUrl && (
            <Button
              buttonText={t(`knownTechs.learnMore`)}
              iconRight={<FaArrowRight size={'1.2em'} />}
              arrowAnimation={true}
              style={{
                fontSize: width < 768 ? '1em' : '0.7em',
                margin: width < 768 ? '2em auto 1em auto' : '1em 1em 0 0',
              }}
              onClickUrl={projectData?.projectData.portfolioUrl}
            />
          )}
          {projectData?.projectData.githubUrl && (
            <Button
              buttonText={t(`knownTechs.github`)}
              iconLeft={<FaGithub size={'1.2em'} />}
              style={{
                fontSize: width < 768 ? '1em' : '0.7em',
                margin: width < 768 ? '1em auto' : '1em 0 0 0',
              }}
              onClickUrl={projectData?.projectData.githubUrl}
            />
          )}
        </LinksContainer>
      </ProjectDescription>
    </ProjectContainer>
  );
};

const ProjectContainer = styled.div<{ activeProject: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  -webkit-transition: all 0.6s ease-out,
    -webkit-all 0.6s cubic-bezier(0.8, 1.35, 0.75, 1.45);
  transition: all 0.6s ease-out,
    -webkit-all 0.6s cubic-bezier(0.8, 1.35, 0.75, 1.45);
  transition: all 0.6s;
  min-height: 80vh;

  @media (min-width: 576px) {
    flex-direction: row-reverse;
  }

  ${(props) =>
    !props.activeProject &&
    css`
      position: absolute;
      transform: translateY(100vh);
      opacity: 0;
    `}
`;

const ProjectDescription = styled.div<{ activeProject: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  height: 100%;
  flex: 1;

  ${(props) =>
    !props.activeProject &&
    css`
      display: none;
    `}
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ProjectImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 0.2em;
  width: 80%;
  position: relative;

  @media (min-width: 576px) {
    max-width: 40%;
  }
`;

const ProjectImageOverlay = styled.div`
  opacity: 0;
  position: absolute;
  border-radius: 0.5em;
  color: #fff;
  background: rgba(128, 144, 167, 0.4);
  width: 99%;
  height: 85%;
  top: 50%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  transform: translateY(-50%);
  z-index: 1;

  &:hover {
    opacity: 1;
    -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
  }
`;

const VisitSite = styled.h3`
  fontfamily: 'Corben';
  fontweight: 'bold';
  textalign: 'center';
  position: absolute;
  bottom: 3.5em;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
    1px 1px 1px rgba(0, 0, 0, 0.5);
`;
