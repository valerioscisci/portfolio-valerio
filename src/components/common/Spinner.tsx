import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

export const Spinner: React.FC = () => {
  return (
    <CircleLoader
      css={`
        margin: auto;
      `}
      size={150}
      color={'#222831'}
      loading={true}
    />
  );
};
