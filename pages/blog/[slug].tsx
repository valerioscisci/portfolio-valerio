import fs from 'fs';
import matter from 'gray-matter';
import { Layout } from '../../components/ui/Layout/Layout';
import Seo from '../../components/common/Seo/Seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled, { css } from 'styled-components';
import { useGetInitialPageState } from '../../hooks/useGetInitialPageState';
import Image from 'next/image';
import { BlogPost } from '../../types';
import { url } from '../../config/config';
import { Heading } from '../../components/ui/Heading/Heading';
import { MarkdownRenderer } from '../../components/blog/MarkdownRenderer/MarkdownRenderer';
import { Paragraph } from '../../components/ui/Paragraph/Paragraph';
import { CategoryPill } from '../../components/blog/PostPreview/PostPreview';
import { Button } from '../../components/ui/Button/Button';
import { join } from 'path';

// Markdown parser: https://www.npmjs.com/package/markdown-to-jsx

interface SlugPostProps {
  post: BlogPost;
}

const SlugPost: React.FC<SlugPostProps> = ({ post }) => {
  const { t, router, width } = useGetInitialPageState(['blog', 'common']);
  const postImage = `${url}${post.frontmatter.cover_image}`;

  return (
    <Layout mainSlider={false} t={t} width={width} router={router}>
      <Main>
        <Seo
          pageTitle={post.frontmatter.title}
          description={post.frontmatter.description}
          ogImage={postImage}
        />
        <TitleContainer>
          <Heading>{post.frontmatter.title}</Heading>
        </TitleContainer>
        {post.frontmatter.category.length && (
          <CategoryContainer>
            {post.frontmatter.category.map((category) => (
              <CategoryPill key={category}>{category}</CategoryPill>
            ))}
          </CategoryContainer>
        )}
        <ImageContainer>
          <Image src={postImage} width={width} height={width / 1.9} />
        </ImageContainer>
        <Content>
          <Paragraph>{`${t('blog:postedOn')} ${
            post.frontmatter.date
          }`}</Paragraph>
          <MarkdownRenderer content={post.content} />
          <ButtonContainer>
            <Button
              buttonText={t('blog:goBack')}
              onClickUrl={`${router.locale}/blog`}
            />
          </ButtonContainer>
        </Content>
      </Main>
    </Layout>
  );
};

export default SlugPost;

export async function getServerSideProps(context) {
  const splitPath = context.req.url.split('/');
  const slug = splitPath[splitPath.length - 1];
  const postsDirectory = join(process.cwd(), 'posts');

  const markdownWithMeta = fs.readFileSync(
    `${postsDirectory}/${context.locale}/${slug}.md`
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['blog', 'common'])),
      post: {
        frontmatter,
        content,
        slug,
      },
    },
  };
}

const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
`;

const commonCss = css`
  text-align: left;
  max-width: 1200px;
  width: 100%;
`;

const TitleContainer = styled.div`
  ${commonCss}
  padding: 3em 1.5em 1em 1.5em;
`;

const Content = styled.div`
  ${commonCss}
  max-width: 80ch;
  padding: 2em 1.5em;
`;

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;

const CategoryContainer = styled.div`
  ${commonCss}
  margin: 0 0 1.5em 4em;
  display: flex;
  gap: 0.5em;
  flex-direction: row;
  jusitfy-content: flex-start;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 2em 0;
`;
