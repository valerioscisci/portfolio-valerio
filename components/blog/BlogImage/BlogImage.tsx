import styled from 'styled-components';

export const BlogImage = (props) => {
  return <Image {...props} />;
};

const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: auto;
  margin: 2em 0;
`;
