import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export interface StyledLinkProps {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip: React.FC<StyledLinkProps> = ({
  text,
  position,
  ...props
}) => {
  return (
    <Container data-tip={text}>
      {props.children}
      <ReactTooltip place={position} />
    </Container>
  );
};

const Container = styled.span`
  cursor: help;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.backgroundDark};
`;
