import { TFunction } from 'next-i18next';
import { useCallback } from 'react';
import styled from 'styled-components';
import { SubmitButton } from '../../ui/Button/Button';
import { HeadingTitle } from '../../ui/HeadingTitle/HeadingTitle';

interface ErrorHandlerProps {
  reloadButton?: boolean;
  reloadFunction?: () => void;
  t?: TFunction;
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  children,
  reloadButton = true,
  reloadFunction,
  t,
}) => {
  const reload = useCallback(() => window.location.reload(), []);

  return (
    <Container>
      <ErrorContainer>
        <HeadingTitle style={{ margin: '1em' }}>
          {t('common:error')}
        </HeadingTitle>
        {children}

        {reloadButton && (
          <>
            <hr style={{ width: '50%', margin: '2em auto' }} />
            <SubmitButton onClick={reloadFunction ? reloadFunction : reload}>
              {t('common:reload')}
            </SubmitButton>
          </>
        )}
      </ErrorContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 2em;
`;

const ErrorContainer = styled.div`
  border: 1px solid red;
  padding: 1em;
  border-radius: 0.7em;
`;
