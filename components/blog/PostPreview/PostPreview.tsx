import { TFunction } from 'next-i18next';
import Image from 'next/image';
import { NextRouter } from 'next/router';
import React from 'react';
import { FaArrowRight, FaClock } from 'react-icons/fa';
import styled from 'styled-components';
import { url } from '../../../config/config';
import { BlogPost } from '../../../types';
import { Heading } from '../../ui/Heading/Heading';
import { Paragraph } from '../../ui/Paragraph/Paragraph';

interface PostPreviewProps {
  post: BlogPost;
  router: NextRouter;
  width: number;
  t: TFunction;
}

export const PostPreview: React.FC<PostPreviewProps> = ({
  post,
  router,
  width,
  t,
}) => {
  const previewWidth =
    width > 768 ? Math.min(width / 3, 500) : Math.min(width - 50, 500);

  return (
    <Container
      href={`${url}${router.locale}/blog/${post.slug}`}
      target={'_self'}
      width={previewWidth}
    >
      <Image
        src={`${url}${post.frontmatter.cover_image}`}
        width={previewWidth}
        height={previewWidth / 1.9}
      />
      <Content>
        <CategoriesContainer>
          {post.frontmatter.category.map((category) => (
            <CategoryPill key={category}>{category}</CategoryPill>
          ))}
        </CategoriesContainer>
        <HeadingInfoContainer>
          <Column>
            <Paragraph>{post.frontmatter.date}</Paragraph>
          </Column>
          <Column>
            <FaClock />
            <Paragraph>
              {post.readingTime} {t('blog:readingTime')}
            </Paragraph>
          </Column>
        </HeadingInfoContainer>
        <Heading variant={2}>{post.frontmatter.title}</Heading>
        <Paragraph>
          {post.frontmatter.description.length > 150
            ? `${post.frontmatter.description.substring(0, 125)}...`
            : post.frontmatter.description}
        </Paragraph>
        <ReadMoreContainer>
          <Paragraph>{t('blog:readMore')}</Paragraph>
          <FaArrowRight size={'15'} />
        </ReadMoreContainer>
      </Content>
    </Container>
  );
};

const Container = styled.a<{ width: number }>`
  min-width: ${(props) => props.width}px;
  width: ${(props) => props.width}px;
  border-radius: 0.7em;
  border: 1px solid ${(props) => props.theme.colors.backgroundLight};
  box-shadow: 0 0.5em 1em -0.5em ${(props) => props.theme.colors.backgroundLight};
  overflow: hidden;
  text-decoration: none;
  color: ${(props) => props.theme.colors.textColorBlack};
  position: relative;

  span img {
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    span img {
      transform: scale(1.1);
      filter: contrast(175%) brightness(103%);
    }
  }
`;

const Content = styled.div`
  padding: 0 1em 1em 1em;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5em;
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const CategoryPill = styled.span`
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 0.3em;
  padding: 0.4em 0.7em;
  margin: 0.2em 0.3em;
  color: ${(props) => props.theme.colors.textColorBlack};
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 0.1em 0.2em 0 ${(props) => props.theme.colors.backgroundDark};
`;

const ReadMoreContainer = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0.5em;
  transition: gap 0.2s ease-in;
  & svg {
    transition: all 0.2s ease-in;
  }
  &:hover {
    gap: 0.7em;
    svg {
      margin-right: -0.5em;
    }
  }
`;

const HeadingInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`;
