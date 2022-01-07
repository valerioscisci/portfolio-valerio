import styled from 'styled-components';
import styles from '../../styles/Common/Image.module.css';

export const BlogImage = (props) => {
  return <Image {...props} className={styles.image} />;
};

const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: auto;
`;
