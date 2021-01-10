import React from 'react';
import styled from 'styled-components';

export interface ParagraphProps {
  color?: string;
  style?: React.CSSProperties;
}

export const Paragraph: React.FC<ParagraphProps> = ({
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

const Container = styled.p<{ color?: string }>`
  color: ${(props) =>
    props.color === 'white'
      ? props.theme.colors.textColorWhite
      : props.theme.colors.textColorBlack};
  font-family: Corben;
  font-size: 1em;
  word-spacing: 0.15em;
  letter-spacing: 0.02em;
  margin: 0;
`;
