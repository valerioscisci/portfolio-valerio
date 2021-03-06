import React from 'react';
import styled, { css } from 'styled-components';

export interface ParagraphProps {
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  color,
  style,
  className,
  ...props
}) => {
  let flatStyle: any = style;
  if (Array.isArray(style)) {
    for (let i = 0; i < style.length; i++) {
      flatStyle = flatStyle + style[i];
    }
  }
  return (
    <Container color={color} style={style} className={className} {...props}>
      {props.children}
    </Container>
  );
};

const Container = styled.p<{ color?: string }>`
  ${(props) => {
    switch (true) {
      case props.color === 'white':
        return css`
          color: ${(props) => props.theme.colors.textColorWhite};
        `;
      case props.color === 'green':
        return css`
          color: ${(props) => props.theme.colors.primary};
        `;
      case props.color === 'red':
        return css`
          color: ${(props) => props.theme.colors.error};
        `;
      default:
        return css`
          color: ${(props) => props.theme.colors.textColorBlack};
        `;
    }
  }}
  font-family: Corben;
  font-size: 1em;
  word-spacing: 0.15em;
  letter-spacing: 0.02em;
  margin: 0;
  white-space: pre-wrap;
`;
