import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { HashLink } from 'react-router-hash-link';

export interface StyledLinkProps {
  color?: string;
  href: string;
  target?: string;
  hoverSpacing?: boolean;
  style?: React.CSSProperties;
  routerLink?: boolean;
  scrollTo?: string;
}

export const StyledLink: React.FC<StyledLinkProps> = ({
  color,
  href,
  target,
  hoverSpacing = true,
  style,
  routerLink = false,
  scrollTo,
  ...props
}) => {
  const goTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const scrollToId = useCallback(() => {
    if (scrollTo) {
      const id = document.getElementById(scrollTo);
      if (id) {
        id.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollTo]);

  const linkCommonStyle = {
    textDecoration: 'none',
  };

  return routerLink ? (
    <Link to={href} style={{ ...style, ...linkCommonStyle }} onClick={goTop}>
      <LinkContainer hoverSpacing={hoverSpacing} color={color}>
        {props.children}
      </LinkContainer>
    </Link>
  ) : (
    <HashLink
      smooth
      to={href}
      style={{ ...style, ...linkCommonStyle }}
      onClick={scrollToId}
    >
      <LinkContainer hoverSpacing={hoverSpacing} color={color}>
        {props.children}
      </LinkContainer>
    </HashLink>
  );
};

const LinkContainer = styled.span<{ color?: string; hoverSpacing?: boolean }>`
  color: ${(props) => {
    switch (true) {
      case props.color === 'white':
        return props.theme.colors.textColorWhite;
      case props.color === 'secondary':
        return props.theme.colors.secondary;
    }
  }};
  font-family: Corben;
  font-size: 1em;
  word-spacing: 0.15em;
  letter-spacing: 0.02em;
  margin: 0;
  text-decoration: none;
  transition: letter-spacing 0.1s ease-out;
  &:hover,
  &:focus,
  &:active {
    @media (min-width: 576px) {
      color: ${(props) => props.theme.colors.primary};
      ${(props) =>
        props.hoverSpacing &&
        css`
          letter-spacing: 0.15em;
        `}
    }
  }
`;
