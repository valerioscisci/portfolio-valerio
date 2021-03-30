import React, { useCallback } from 'react';
import styled from 'styled-components';
import logoPlane from '../../assets/images/common/logoPlane.svg';

export const GoTop: React.FC = () => {
  const onClick = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return <Container onClick={onClick}></Container>;
};

const Container = styled.a`
  position: fixed;
  cursor: pointer;
  width: 2em;
  height: 2em;
  background-image: url(${logoPlane});
  background-size: 70% 70%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: ${(props) => props.theme.colors.backgroundDark};
  border-radius: 50%;
  bottom: 1em;
  right: 1em;
  text-decoration: none;
  transform: rotate(-45deg);
  transition: background-position 0.1s linear;
  z-index: 99;

  &:hover {
    background-position: 80% 20%;
  }
`;
