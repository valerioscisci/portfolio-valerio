import { TFunction } from 'next-i18next';
import { CSSProperties } from 'react';
import styled from 'styled-components';

interface ButMeACoffeProps {
  containerStyle?: CSSProperties;
  t: TFunction;
}

const ButMeACoffee: React.FC<ButMeACoffeProps> = ({ containerStyle, t }) => {
  return (
    <Container style={containerStyle}>
      <strong style={{ marginBottom: '10px' }}>{t('blog:supportMe')}:</strong>
      <a
        href="https://www.buymeacoffee.com/valerioscisci"
        target="_blank"
        ref={'noreferrer'}
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style={{ height: '40px', width: '150px' }}
        />
      </a>
    </Container>
  );
};

export default ButMeACoffee;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
