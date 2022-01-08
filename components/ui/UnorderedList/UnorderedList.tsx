import styled from 'styled-components';

export const UnorderedList = (props) => {
  return <List> {props.children}</List>;
};

const List = styled.ul`
  font-family: Corben;
  font-size: 1em;
  word-spacing: 0.15em;
  letter-spacing: 0.02em;
  margin: 0 auto 2em;
  white-space: pre-wrap;

  & li {
    padding-bottom: 0.4em;
  }
`;
