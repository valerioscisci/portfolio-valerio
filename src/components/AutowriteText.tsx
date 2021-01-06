import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export interface AutowriteTextProps {
  text?: string;
  textStyle?: React.CSSProperties | undefined;
  letterGenerationTiming: number;
  canStart?: boolean;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const AutowriteText: React.FC<AutowriteTextProps> = ({
  text = '',
  textStyle,
  letterGenerationTiming,
  canStart = true,
}) => {
  const [currentShownText, setCurrentShownText] = useState<string>('');
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [lockTextUpdate, setLockTextUpdate] = useState<boolean>(false);
  const isMountedRef = useRef(false);

  useEffect((): any => {
    isMountedRef.current = true;
    if (
      currentTextIndex < text.length &&
      !lockTextUpdate &&
      isMountedRef.current &&
      canStart
    ) {
      setLockTextUpdate(true);
      setCurrentShownText(currentShownText + '_');
      for (let i = 0; i < 5; i++) {
        setTimeout(async () => {
          if (isMountedRef.current) {
            setCurrentShownText(
              currentShownText.substring(0, currentShownText.length - 1) +
                alphabet[Math.floor(Math.random() * alphabet.length)] +
                '_',
            );
          }
        }, (i * letterGenerationTiming) / 10);
      }
      setTimeout(async () => {
        if (isMountedRef.current) {
          setCurrentShownText(
            currentShownText.substring(0, currentShownText.length) +
              text.charAt(currentTextIndex),
          );
          setCurrentTextIndex(currentTextIndex + 1);
          setLockTextUpdate(false);
        }
      }, letterGenerationTiming);
    }
    return () => (isMountedRef.current = false);
  }, [
    text,
    letterGenerationTiming,
    canStart,
    currentShownText,
    lockTextUpdate,
    currentTextIndex,
  ]);

  return <Container style={textStyle}>{currentShownText}</Container>;
};

const Container = styled.div``;
