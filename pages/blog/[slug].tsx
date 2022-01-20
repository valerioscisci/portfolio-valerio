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
import { GetStaticPaths, GetStaticProps } from 'next';
import readingTime from 'reading-time';
import { FaClock } from 'react-icons/fa';
import { ShareBox } from '../../components/blog/ShareBox/ShareBox';

// Markdown parser: https://www.npmjs.com/package/markdown-to-jsx

interface SlugPostProps {
  post: BlogPost;
}

const SlugPost: React.FC<SlugPostProps> = ({ post }) => {
  const { t, router, width } = useGetInitialPageState(['blog', 'common']);
  const postImage = `${url}${post.frontmatter.cover_image}`;

  const shareBox = () => {
    return (
      <ShareBox
        url={`${url}${router.locale}${router.asPath}`}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        t={t}
      />
    );
  };
  return (
    <Layout mainSlider={false} t={t} width={width} router={router}>
      <Main>
        <Seo
          pageTitle={post.frontmatter.title}
          description={post.frontmatter.description}
          ogImage={postImage}
          article={true}
          publishDate={post.frontmatter.date}
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
          {shareBox()}
          <HeadingInfoContainer>
            <Column>
              <Paragraph>{`${t('blog:postedOn')} ${
                post.frontmatter.date
              }`}</Paragraph>
            </Column>
            <Column>
              <FaClock />
              <Paragraph>
                {post.readingTime} {t('blog:readingTime')}
              </Paragraph>
            </Column>
          </HeadingInfoContainer>
          <MarkdownRenderer content={post.content} />
          <ButtonContainer>
            <Button
              buttonText={t('blog:goBack')}
              onClickUrl={`${router.locale}/blog`}
            />
          </ButtonContainer>
          {shareBox()}
        </Content>
      </Main>
    </Layout>
  );
};

export default SlugPost;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params['slug'];

  const postsDirectory = join(process.cwd(), 'posts');

  const markdownWithMeta = fs.readFileSync(
    `${postsDirectory}/${context.locale}/${slug}.md`
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const stats = readingTime(content);
  const readingMinute = Math.ceil(stats.minutes);

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['blog', 'common'])),
      post: {
        frontmatter,
        content,
        slug,
        readingTime: readingMinute,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const blogSlugs = ((context) => {
    const values = context.keys();

    const data = values.map((key) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);

      return slug;
    });
    return data;
    //@ts-ignore
  })(require.context('../../posts', true, /\.md$/));

  let paths = [];
  for (const locale of locales) {
    paths.push(...blogSlugs.map((slug) => `/${locale}/blog/${slug}`));
  }
  return {
    paths,
    fallback: false,
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
  flex-wrap: wrap;
  jusitfy-content: flex-start;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 2em 0;
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
