import React from 'react';
import styled from 'styled-components';

export interface HeadingTitleProps {
  color?: string;
  style?: React.CSSProperties;
}

export const HeadingTitle: React.FC<HeadingTitleProps> = ({
  color,
  style,
  ...props
}) => {
  return (
    <Container color={color} style={style}>
      {props.children}
    </Container>
  );
};

const Container = styled.h2<{ color?: string }>`
  color: ${(props) =>
    props.color === 'white'
      ? props.theme.colors.textColorWhite
      : props.theme.colors.textColorBlack};
  font-family: Corben;
  text-transform: uppercase;
  padding: 0.2em 0;
  text-align: center;
  margin: 2em 0;
  word-spacing: 0.3em;
  letter-spacing: 0.15em;
  font-size: 2em;
`;
