import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { url } from '../../../config/config';
import { BlogPost } from '../../../types';

interface PostPreviewProps {
  post: BlogPost;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  console.log(post);

  return (
    <Container href={`${url}blog/${post.slug}`} target={'_self'}>
      <Image
        src={`${url}${post.frontmatter.cover_image}`}
        width={450}
        height={236}
      />
      <Content>
        <CategoriesContainer>
          {post.frontmatter.category.map((category) => (
            <CategoryPill>{category}</CategoryPill>
          ))}
        </CategoriesContainer>
        <Title>{post.frontmatter.title}</Title>
        <p>{post.frontmatter.date.split('/')[2]}</p>
        <p>{post.frontmatter.date}</p>
        <p>{post.frontmatter.description}</p>
        <p>read more...</p>
      </Content>
    </Container>
  );
};

const Container = styled.a`
  width: 250px;
  border-radius: 0.3em;
  background-color: ${(props) => props.theme.colors.backgroundLight};
  overflow: hidden;
  text-decoration: none;
  color: white;
  position: relative;
`;

const Content = styled.div`
  padding: 0 1em;
`;

const Title = styled.h3``;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5em;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const CategoryPill = styled.span`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.3em;
  padding: 0.2em 0.5em;
  margin: 0.2em;
  color: ${(props) => props.theme.colors.textColorBlack};
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
`;
