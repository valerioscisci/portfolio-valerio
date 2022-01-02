import Head from 'next/head';
import { url } from '../../../config/config';

interface SeoProps {
  pageTitle?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const Seo: React.FC<SeoProps> = ({
  pageTitle,
  description,
  ogImage,
  noIndex = false,
}) => {
  const pagetitle = pageTitle ? pageTitle : 'Randy.gg';
  const pagedescription = description ? description : 'Randy website';
  const image = ogImage ? ogImage : `${url}images/common/og_background.jpeg`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{pagetitle}</title>
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1"
      />
      <meta name="title" content={pagetitle} />
      <meta name="description" content={pagedescription} />
      <base>{url}</base>

      {/* OpenGraph tags */}
      <meta name="og:url" content={url} />
      <meta name="og:title" content={pagetitle} />
      <meta name="og:description" content={pagedescription} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:url" content={image} />
      <meta name="og:image" content={image} />
      <meta name="og:type" content="website" />
      <meta name="fb:app_id" content={process.env.NEXT_PUBLIC_FACEBOOK_ID} />

      {/* Remove page from crawlers indexing */}
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
};

export default Seo;
