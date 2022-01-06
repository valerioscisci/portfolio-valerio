import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/ui/Layout/Layout';
import { useRouter } from 'next/router';
import { useWindowSize } from '../../hooks/useWindowSize';
import Seo from '../../components/common/Seo/Seo';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import fs from 'fs';
import matter from 'gray-matter';
import { BlogPost } from '../../types';
import { ErrorHandler } from '../../components/common/ErrorHandler/ErrorHandler';
import { PostPreview } from '../../components/blog/PostPreview/PostPreview';
import { HeadingTitle } from '../../components/ui/HeadingTitle/HeadingTitle';
import { SubHeading } from '../../components/homepage/SubHeading/SubHeading';
import { sortByDate } from '../../utils/utils';

interface BlogScreenProps {
  posts: Array<BlogPost>;
}

const BlogScreen: React.FC<BlogScreenProps> = ({ posts }) => {
  const { t } = useTranslation(['blog', 'common']);
  const router = useRouter();

  const [width] = typeof window !== 'undefined' ? useWindowSize() : [0];
  return (
    <Layout mainSlider={false} t={t} width={width} router={router}>
      <Main>
        <Seo
          pageTitle={t('blog:metadata.title')}
          description={t('blog:metadata.description')}
        />
        <HeadingTitle>{t('blog:metadata.title')}</HeadingTitle>
        <SubHeading>{t('blog:metadata.description')}</SubHeading>
        <PostsContainer>
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return <PostPreview key={index} post={post} />;
            })
          ) : (
            <ErrorHandler t={t} reloadButton={true}>
              {t('blog:blogPostsFetchingError')}
            </ErrorHandler>
          )}
        </PostsContainer>
      </Main>
    </Layout>
  );
};

export default BlogScreen;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const files = fs
    .readdirSync(`${process.cwd()}/posts`)
    .filter((file) => file.endsWith('.md'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      `${process.cwd()}/posts/${filename}`,
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['blog', 'common'])),
      posts: posts.sort(sortByDate),
    },
  };
};

const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2em 0;
  gap: 1.5em;
`;
