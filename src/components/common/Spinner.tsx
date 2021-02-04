import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

interface Props {
  size?: number;
}

export const Spinner: React.FC<Props> = ({ size = 150 }) => {
  return (
    <CircleLoader
      css={`
        margin: auto;
      `}
      size={size}
      color={'#222831'}
      loading={true}
    />
  );
};
