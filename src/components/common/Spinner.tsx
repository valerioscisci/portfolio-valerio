import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import { PrecompiledCss } from 'react-spinners/interfaces';

interface Props {
  size?: number;
  style?: string | PrecompiledCss;
}

export const Spinner: React.FC<Props> = ({ size = 150, style }) => {
  return (
    <CircleLoader
      css={'margin: auto;' + style}
      size={size}
      color={'#222831'}
      loading={true}
    />
  );
};
