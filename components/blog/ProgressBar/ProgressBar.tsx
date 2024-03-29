import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const ProgressBar = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  });

  return <Bar width={readingProgress} />;
};

const Bar = styled.div<{ width: number }>`
  position: sticky;
  z-index: 999;
  height: 5px;
  top: 0;
  background-color: ${(props) => props.theme.colors.error};
  width: ${(props) => props.width}%;
`;
