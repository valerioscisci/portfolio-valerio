import React from 'react';
import styled from 'styled-components';

export interface StyledLinkProps {
  text: string;
}

export const Tooltip: React.FC<StyledLinkProps> = ({ text, ...props }) => {
  return <Container data-tip={text}>{props.children}</Container>;
};

const Container = styled.span`
  cursor: help;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.backgroundDark};
`;
