import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Footer } from '../components/navigation/Footer';
import { Header } from '../components/navigation/Header';
import { GitHubCorner } from '../components/common/GitHubCorner';
import { useWindowSize } from '../hooks/useWindowSize';
import { GoTop } from '../components/common/GoTop';

type ScreenContainerProps = {
  mainSlider?: boolean;
};
export const ScreenContainer: React.FC<ScreenContainerProps> = observer(
  ({ mainSlider, ...props }) => {
    const [width] = useWindowSize();

    return (
      <Container>
        <Header width={width} mainSlider={mainSlider} />
        {props.children}
        <Footer />
        {width > 768 && <GitHubCorner />}
        <GoTop />
      </Container>
    );
  },
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;
