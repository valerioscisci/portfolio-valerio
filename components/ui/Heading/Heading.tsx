import React from 'react';
import styled, { css } from 'styled-components';

export interface HeadingProps {
  variant?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
  variant = 1,
  color,
  style,
  ...props
}) => {
  const components = {
    1: (
      <H1 color={color} style={style}>
        {props.children}
      </H1>
    ),
    2: (
      <H2 color={color} style={style}>
        {props.children}
      </H2>
    ),
    3: (
      <H3 color={color} style={style}>
        {props.children}
      </H3>
    ),
    4: (
      <H4 color={color} style={style}>
        {props.children}
      </H4>
    ),
    5: (
      <H5 color={color} style={style}>
        {props.children}
      </H5>
    ),
    6: (
      <H6 color={color} style={style}>
        {props.children}
      </H6>
    ),
  };

  return components[variant];
};

const commonCss = css<{ color?: string }>`
  margin: 10px 0;
  color: ${(props) =>
    props.color === 'white'
      ? props.theme.colors.textColorWhite
      : props.theme.colors.textColorBlack};
  fontSize: 1.5em,
  fontFamily: Corben,
  fontWeight: bold,
  textAlign: center,
  minHeight: 4em,
  marginBottom: 1em,
`;

const H1 = styled.h1<{ color?: string }>`
  ${commonCss}
`;

const H2 = styled.h2<{ color?: string }>`
  ${commonCss}
`;

const H3 = styled.h3<{ color?: string }>`
  ${commonCss}
`;

const H4 = styled.h4<{ color?: string }>`
  ${commonCss}
`;

const H5 = styled.h5<{ color?: string }>`
  ${commonCss}
`;

const H6 = styled.h6<{ color?: string }>`
  ${commonCss}
`;
