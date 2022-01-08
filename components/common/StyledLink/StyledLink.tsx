import Link from 'next/link';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

export interface StyledLinkProps {
  color?: string;
  hoverColor?: string;
  href: string;
  target?: string;
  hoverSpacing?: boolean;
  style?: React.CSSProperties;
  scrollTo?: string;
}

export const StyledLink: React.FC<StyledLinkProps> = ({
  color,
  hoverColor,
  href,
  target = '_self',
  hoverSpacing = true,
  style,
  scrollTo,
  ...props
}) => {
  const goTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const linkCommonStyle = {
    textDecoration: 'none',
  };

  return (
    <Link href={href}>
      <a
        style={{ ...style, ...linkCommonStyle }}
        onClick={goTop}
        target={target}
      >
        <LinkContainer
          hoverSpacing={hoverSpacing}
          color={color}
          hoverColor={hoverColor}
        >
          {props.children}
        </LinkContainer>
      </a>
    </Link>
  );
};

const LinkContainer = styled.span<{
  color?: string;
  hoverSpacing?: boolean;
  hoverColor?: string;
}>`
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
  transition: all 0.1s ease-out;
  &:hover,
  &:focus,
  &:active {
    @media (min-width: 576px) {
      color: ${(props) =>
        props.hoverColor
          ? props.theme.colors[props.hoverColor]
          : props.theme.colors.primary};
      ${(props) =>
        props.hoverSpacing &&
        css`
          letter-spacing: 0.15em;
        `}
      font-weight: bold;
    }
  }
`;
