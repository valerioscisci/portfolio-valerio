import React from 'react';
import styled from 'styled-components';
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
  project: portfolioProject;
  noProjects: boolean;
}

export const ProjectSlide: React.FC<ProjectSlideProps> = ({
  project,
  noProjects,
}) => {
  const { t } = useTranslation();
  const projectData: projectData | undefined = jsonDB.portfolioData.find(
    (projectData) => {
      return projectData.projectName === project.alt;
    },
  );

  return (
    <Container>
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
            showOnPhone={true}
          />
        </ConditionalWrapper>
      </ProjectImageContainer>
      <ProjectDescription>
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
            t('knownTechs.noProjectsDescription').length / 20
          }
          textStyle={{
            fontFamily: 'Corben',
            minHeight: '10em',
          }}
        />
        <LinksContainer>
          {projectData?.projectData.portfolioUrl && (
            <Button
              buttonText={t(`knownTechs.learnMore`)}
              iconRight={<FaArrowRight size={'1.2em'} />}
              arrowAnimation={true}
              style={{
                fontSize: '0.8em',
              }}
              onClickUrl={projectData?.projectData.portfolioUrl}
            />
          )}
          {projectData?.projectData.githubUrl && (
            <Button
              buttonText={t(`knownTechs.github`)}
              iconLeft={<FaGithub size={'1.2em'} />}
              style={{
                fontSize: '0.8em',
              }}
              onClickUrl={projectData?.projectData.githubUrl}
            />
          )}
        </LinksContainer>
      </ProjectDescription>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
`;

const ProjectDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  flex: 1;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ProjectImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 0.2em;
  max-width: 50%;
  position: relative;
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
