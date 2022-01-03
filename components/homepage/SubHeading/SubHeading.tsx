import React from 'react';
import styled from 'styled-components';

export interface SubHeadingProps {
  color?: string;
  style?: React.CSSProperties;
}

export const SubHeading: React.FC<SubHeadingProps> = ({
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

const Container = styled.em<{ color?: string }>`
  color: ${(props) =>
    props.color === 'white'
      ? props.theme.colors.textColorWhite
      : props.theme.colors.textColorBlack};
  font-family: Manrope;
  padding: 0.2em 0;
  text-align: center;
  margin: 0;
  word-spacing: 0.3em;
  letter-spacing: 0.15em;
  font-size: 1.2em;
`;
