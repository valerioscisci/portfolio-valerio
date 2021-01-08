import * as React from 'react';
import withInstagramFeed from 'origen-react-instagram-feed';
import compose from 'recompose/compose';

export type Props = {
  media?: Array<{
    displayImage: string;
    id?: string;
    postLink?: string;
    accessibilityCaption?: string;
  }>;
  account: string;
  status: 'completed' | 'loading' | 'failed';
};

const InstaGrid = ({ media, account, status }: Props) => {
  console.log(media, account, status);
  return (
    <div>
      {media &&
        status === 'completed' &&
        media.map(({ displayImage, id, postLink, accessibilityCaption }) => (
          <div key={id || displayImage}>
            <a href={postLink || `https://www.instagram.com/${account}/`}>
              <img
                src={displayImage}
                alt={accessibilityCaption || 'Instagram picture'}
              />
            </a>
          </div>
        ))}
      {status === 'loading' && <p>loading...</p>}
      {status === 'failed' && <p>Check instagram here</p>}
    </div>
  );
};

InstaGrid.defaultProps = {
  media: undefined,
};

export default compose(withInstagramFeed)(InstaGrid);
