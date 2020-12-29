import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LogoImage from '../assets/images/Logo.png';
import { Link, BrowserRouter } from 'react-router-dom';
import { MenuIcon } from './MenuIcon';

export interface NavbarProps {
  navLinks: any;
  width: number;
}

export const Navbar: React.FC<NavbarProps> = ({ navLinks, width }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer>
      {!menuOpen && (
        <BrowserRouter>
          <Link to={navLinks[0].route}>
            <Logo src={LogoImage} />
          </Link>
        </BrowserRouter>
      )}
      <MenuIcon
        width={width}
        updateMenuState={(menuOpen) => setMenuOpen(menuOpen)}
      />
      <NavbarRight menuOpen={menuOpen}>
        {navLinks.map((link: any, i: number) => {
          return (
            <li key={i}>
              <BrowserRouter>
                <Link to={link.route}>{link.name}</Link>
              </BrowserRouter>
            </li>
          );
        })}
      </NavbarRight>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  height: 4.5em;
  width: 100%;
  font-family: Manrope;
  letter-spacing: 0.08rem;
  display: flex;
  padding: 0.2em;
  text-transform: uppercase;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.background};
  z-index: 2;
`;

const Logo = styled.img`
  width: 13em;
  height: 4em;
`;

const NavbarRight = styled.ul<{ menuOpen: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  z-index: 2;

  ${(props) =>
    props.menuOpen
      ? css`
          flex-direction: column;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        `
      : css`
          display: none;
          @media (min-width: 768px) {
            display: flex;
          }
        `}

  & li {
    margin: auto 0.5em;

    ${(props) =>
      props.menuOpen &&
      css`
        margin: 1em 0;
        text-align: center;
      `}
    & a {
      position: relative;
      font-size: 1.2em;
      line-height: 1.7em;
      text-decoration: none;
      color: ${(props) => props.theme.colors.primary};

      padding: 0.3em;
      display: inline-block;
      overflow: hidden;

      &:before,
      &:after {
        left: 0;
        width: 100%;
        height: 0.5px;
        background: ${(props) => props.theme.colors.primary};
      }
      &:before {
        bottom: 1px;
        transform: translateX(-100%);
      }
      &:after {
        top: 0;
        transform: translateX(100%);
      }
      &:hover:before,
      &:hover:after {
        transform: translateX(0);
      }
      &:before,
      &:after {
        content: '';
        position: absolute;
        transition: transform 0.4s ease;
      }
    }
`;
