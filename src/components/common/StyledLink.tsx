import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export interface StyledLinkProps {
  color?: string;
  href: string;
  target?: string;
  hoverSpacing?: boolean;
  style?: React.CSSProperties;
  routerLink?: boolean;
}

export const StyledLink: React.FC<StyledLinkProps> = ({
  color,
  href,
  target,
  hoverSpacing = true,
  style,
  routerLink = false,
  ...props
}) => {
  const goTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (routerLink) {
      goTop();
    }
  }, [goTop, routerLink]);

  return routerLink ? (
    <Link to={href} style={style}>
      <LinkContainer hoverSpacing={hoverSpacing} color={color}>
        {props.children}
      </LinkContainer>
    </Link>
  ) : (
    <a href={href} rel={'noreferrer'} target={target} style={style}>
      <LinkContainer hoverSpacing={hoverSpacing} color={color}>
        {props.children}
      </LinkContainer>
    </a>
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
