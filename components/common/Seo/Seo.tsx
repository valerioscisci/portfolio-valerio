import Head from 'next/head';
import { url } from '../../../config/config';
import { valerioTheme } from '../../../pages/_app';

interface SeoProps {
  pageTitle?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  article?: boolean;
  publishDate?: string;
}

const Seo: React.FC<SeoProps> = ({
  pageTitle,
  description,
  ogImage,
  noIndex = false,
  article = false,
  publishDate,
}) => {
  const pagetitle = pageTitle ? pageTitle : 'The Wanderer Developer';
  const pagedescription = description ? description : 'The Wanderer Developer';
  const image = ogImage ? ogImage : `${url}images/common/og_background.jpeg`;
  const date = publishDate ? publishDate : new Date().toISOString();

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{`${pagetitle} | The Wanderer Developer`}</title>
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1"
      />
      <meta name="title" content={pagetitle} />
      <meta name="description" content={pagedescription} />
      <base href={url} target="_blank" />

      {/* OpenGraph tags */}
      <meta name="og:url" content={url} />
      <meta name="og:title" content={pagetitle} />
      <meta name="og:description" content={pagedescription} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:url" content={image} />
      <meta name="og:image" content={image} />
      <meta name="og:type" content={article ? 'article' : 'website'} />
      <meta property="article:author" content="Valerio Scisci" />
      <meta property="article:published_time" content={date} />
      <meta property="article:modified_time" content={date} />
      <meta name="fb:app_id" content={process.env.NEXT_PUBLIC_FACEBOOK_ID} />

      {/* Remove page from crawlers indexing */}
      {noIndex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta name="author" content="Valerio Scisci" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={valerioTheme.colors.primary}
      />
      <meta
        name="msapplication-TileColor"
        content={valerioTheme.colors.primary}
      />
      <meta
        name="theme-color"
        content={valerioTheme.colors.primary}
        data-react-helmet="true"
      />
    </Head>
  );
};

export default Seo;
