import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import LogoImage from '../../assets/images/common/LogoWhite.png';
import { MenuIcon } from './MenuIcon';
import { HashLink as Link } from 'react-router-hash-link';
import { i18n, I18NLang } from '../../i18n';
import itaFlag from '../../assets/images/common/ita_flag.png';
import engFlag from '../../assets/images/common/eng_flag.png';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores';

export interface NavbarProps {
  navLinks: any;
  width: number;
}

export const Navbar: React.FC<NavbarProps> = observer(({ navLinks, width }) => {
  const { home } = useStores();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuIconRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [menuOpen]);

  const changeLanguage = useCallback(
    (lng: I18NLang) => {
      i18n.changeLanguage(lng);
      home.setLanguage(lng);
    },
    [home],
  );

  return (
    <NavbarContainer menuOpen={menuOpen}>
      {!menuOpen && (
        <Link to={navLinks[0].route}>
          <Logo src={LogoImage} />
        </Link>
      )}
      <MenuIcon
        ref={menuIconRef}
        width={width}
        updateMenuState={(menuOpen) => setMenuOpen(menuOpen)}
      />
      <NavbarRight menuOpen={menuOpen}>
        {navLinks.map((link: any, i: number) => {
          return (
            <NavbarItem key={i} menuOpen={menuOpen} route={link.route}>
              <Link
                to={link.route}
                onClick={() => {
                  if (menuIconRef.current) {
                    if (width < 768) {
                      menuIconRef.current?.click();
                    }
                  }
                }}
              >
                {link.name}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarRight>
      <LanguageSelector>
        <ChangeLanguageButton flag={'it'} onClick={() => changeLanguage('it')}>
          it
        </ChangeLanguageButton>
        <ChangeLanguageButton flag={'en'} onClick={() => changeLanguage('en')}>
          en
        </ChangeLanguageButton>
      </LanguageSelector>
    </NavbarContainer>
  );
});

const NavbarContainer = styled.nav<{ menuOpen: boolean }>`
  height: ${(props) => (props.menuOpen ? '100vh' : '4.5em')};
  width: 100%;
  font-family: Manrope;
  letter-spacing: 0.08rem;
  display: flex;
  padding: 0.2em;
  text-transform: uppercase;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.backgroundDark};
  z-index: 2;
  position: relative;
`;

const Logo = styled.img`
  width: auto;
  height: 3.5em;
  margin-left: 0.5em;
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
`;

const NavbarItem = styled.li<{ menuOpen: boolean; route: string }>`
  /* ----------------------------------------------
 * Generated by Animista on 2021-2-6 7:47:10
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation wobble-hor-bottom
 * ----------------------------------------
 */
  @-webkit-keyframes wobble-hor-bottom {
    40%,
    60% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    45% {
      -webkit-transform: translateX(-30px) rotate(-6deg);
      transform: translateX(-30px) rotate(-6deg);
    }
    47% {
      -webkit-transform: translateX(15px) rotate(6deg);
      transform: translateX(15px) rotate(6deg);
    }
    50% {
      -webkit-transform: translateX(-15px) rotate(-3.6deg);
      transform: translateX(-15px) rotate(-3.6deg);
    }
    53% {
      -webkit-transform: translateX(9px) rotate(2.4deg);
      transform: translateX(9px) rotate(2.4deg);
    }
    57% {
      -webkit-transform: translateX(-6px) rotate(-1.2deg);
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }
  @keyframes wobble-hor-bottom {
    40%,
    60% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    45% {
      -webkit-transform: translateX(-30px) rotate(-6deg);
      transform: translateX(-30px) rotate(-6deg);
    }
    47% {
      -webkit-transform: translateX(15px) rotate(6deg);
      transform: translateX(15px) rotate(6deg);
    }
    50% {
      -webkit-transform: translateX(-15px) rotate(-3.6deg);
      transform: translateX(-15px) rotate(-3.6deg);
    }
    53% {
      -webkit-transform: translateX(9px) rotate(2.4deg);
      transform: translateX(9px) rotate(2.4deg);
    }
    57% {
      -webkit-transform: translateX(-6px) rotate(-1.2deg);
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }

  margin: auto 0.5em;

  & a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.textColorBlack};
    padding: 0.3em;
    display: inline-block;
    position: relative;
    font-size: 1.2em;
    line-height: 1.7em;
  }

  ${(props) =>
    props.menuOpen &&
    css`
      margin: 1em 0;
      text-align: center;
    `}

  ${(props) =>
    props.route.trim().toLocaleLowerCase().includes('newsletter')
      ? css`
          background-color: ${(props) => props.theme.colors.textColorWhite};
          border-radius: 0.5em;
          -webkit-animation: wobble-hor-bottom 5s infinite;
          animation: wobble-hor-bottom 5s infinite;
          padding: 0 0.3em;
          &:hover,
          :focus,
          :active {
            box-shadow: 0 0 2px ${(props) => props.theme.colors.textColorWhite},
              0 0 4px ${(props) => props.theme.colors.textColorWhite},
              0 0 6px ${(props) => props.theme.colors.secondary},
              0 0 9px ${(props) => props.theme.colors.secondary},
              0 0 10px ${(props) => props.theme.colors.secondary},
              0 0 12px ${(props) => props.theme.colors.secondary},
              0 0 16px ${(props) => props.theme.colors.secondary};
          }
        `
      : css`
& a {
  color: ${(props) => props.theme.colors.primary};

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
  `}
`;

const LanguageSelector = styled.div`
  position: absolute;
  left: 0.5em;
  bottom: -3em;
`;

const ChangeLanguageButton = styled.button<{ flag?: string }>`
  width: 2.2em;
  height: 2.2em;
  outline: none;
  font-size: 1em;
  font-family: Manrope;
  background-color: ${(props) => props.theme.colors.backgroundDark};
  color: ${(props) => props.theme.colors.textColorWhite};
  margin-right: 1em;
  border-radius: 50%;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  background-size: contain;
  text-shadow: 
  2px   0  0   #000, 
 -2px   0  0   #000, 
  0    2px 0   #000, 
  0   -2px 0   #000, 
  1px  1px 0   #000, 
 -1px -1px 0   #000, 
  1px -1px 0   #000, 
 -1px  1px 0   #000,
  1px  1px 5px #000;
}
  ${(props) => {
    switch (true) {
      case props.flag === 'it':
        return css`
          background-image: url(${itaFlag});
        `;
      case props.flag === 'en':
        return css`
          background-image: url(${engFlag});
          background-position: 0% 50%;
        `;
    }
  }}
`;
