import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { Layout } from '../../components/ui/Layout/Layout';
import Seo from '../../components/common/Seo/Seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useGetInitialPageState } from '../../hooks/useGetInitialPageState';

// Markdown parser: https://www.npmjs.com/package/markdown-to-jsx

interface SlugPostProps {
  frontmatter: any;
  slug: any;
  content: any;
}

const SlugPost: React.FC<SlugPostProps> = ({
  frontmatter: { title, date },
  slug,
  content,
}) => {
  const { t, router, width } = useGetInitialPageState(['blog', 'common']);

  return (
    <Layout mainSlider={false} t={t} width={width} router={router}>
      <Main>
        <Seo
          pageTitle={t('blog:metadata.title')}
          description={t('blog:metadata.description')}
        />
        {/* 
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          <span className={styles.slash}>//&nbsp;</span>
          {title}
        </div>
        <p className={styles.date}>{`Posted on ${date}`}</p>

        <div className={styles.content}>
          <MarkdownRenderer content={content} />
        </div>

        <div className={styles.buttonController}>
          <Link href="/blog">
            <Button onClick={() => (window.location.href = "/blog")}>
              Go back
            </Button>
          </Link>
        </div>
      </div> */}
      </Main>
    </Layout>
  );
};

export default SlugPost;

export async function getServerSideProps(context) {
  const splitPath = context.req.url.split('/');
  const slug = splitPath[splitPath.length - 1];

  const markdownWithMeta = fs.readFileSync(`${process.cwd()}/posts/${slug}.md`);
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['about', 'common'])),
      frontmatter,
      slug,
      content,
    },
  };
}

const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
