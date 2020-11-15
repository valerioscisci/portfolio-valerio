import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosMenu, IoIosClose } from 'react-icons/io';

export interface MenuIconProps {
  updateMenuState: (menuOpen: boolean) => void;
  width: number;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  updateMenuState,
  width,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onClickCallback = useCallback(() => {
    setMenuOpen(!menuOpen);
    updateMenuState(!menuOpen);
  }, [menuOpen, setMenuOpen, updateMenuState]);

  useEffect(() => {
    if (width > 768 && menuOpen) onClickCallback();
  }, [width, menuOpen, onClickCallback]);

  return (
    <Container menuOpen={menuOpen}>
      {menuOpen ? (
        <IoIosClose onClick={onClickCallback} />
      ) : (
        <IoIosMenu onClick={onClickCallback} />
      )}
    </Container>
  );
};

const Container = styled.div<{ menuOpen: boolean }>`
  position: absolute;
  display: flex;
  background: ${(props) => props.theme.colors.background};
  border-radius: 50%;
  width: 10em;
  height: 9em;
  right: -5em;
  top: -5em;
  cursor: pointer;
  transition: 0.5s ease;

  @media (min-width: 768px) {
    display: none;
  }

  & svg {
    display: block;
    position: absolute;
    top: 6.3em;
    left: 2.3em;
    color: ${(props) => props.theme.colors.primary};
    width: 2.5em;
    height: 2.5em;

    ${(props) =>
      props.menuOpen &&
      css`
        width: 3em;
        height: 3em;
        top: 6em;
        left: 2em;
      `}
  }
  ${(props) =>
    props.menuOpen &&
    css`
       {
        box-shadow: 0 0 0 20em ${(props) => props.theme.colors.background},
          0 0 0 50em ${(props) => props.theme.colors.background},
          0 0 0 100em ${(props) => props.theme.colors.background};
        border-radius: 0;
      }
    `}
`;
