import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface AutowriteTextProps {
  text: string;
  textStyle?: React.CSSProperties | undefined;
  letterGenerationTiming: number;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const AutowriteText: React.FC<AutowriteTextProps> = ({
  text,
  textStyle,
  letterGenerationTiming,
}) => {
  const [currentShownText, setCurrentShownText] = useState<string>('');
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [lockTextUpdate, setLockTextUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (currentTextIndex < text.length && !lockTextUpdate) {
      setLockTextUpdate(true);
      setCurrentShownText(currentShownText + '_');
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          setCurrentShownText(
            currentShownText.substring(0, currentShownText.length - 1) +
              alphabet[Math.floor(Math.random() * alphabet.length)] +
              '_',
          );
        }, (i * letterGenerationTiming) / 10);
      }
      setTimeout(() => {
        setCurrentShownText(
          currentShownText.substring(0, currentShownText.length) +
            text.charAt(currentTextIndex),
        );
        setCurrentTextIndex(currentTextIndex + 1);
        setLockTextUpdate(false);
      }, letterGenerationTiming);
    }
  }, [text, currentShownText, lockTextUpdate, currentTextIndex]);

  return <Container style={textStyle}>{currentShownText}</Container>;
};

const Container = styled.div``;
