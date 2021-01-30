import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

export interface TextInputProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  required: boolean;
  isValid: boolean;
  onChange: (newValue: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type,
  required,
  isValid,
  onChange,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const fieldRef = useRef<any>();

  useEffect(() => {
    let interval = setInterval(() => {
      if (fieldRef.current) {
        setValue(fieldRef.current.value);
        clearInterval(interval);
      }
    }, 100);
  });

  return (
    <InputContainer>
      <Label htmlFor={name} focused={focused}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Label>
      {['text', 'email'].includes(type) ? (
        <Textbox
          ref={fieldRef}
          type={type}
          id={name}
          name={name}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (!value) {
              setFocused(false);
            }
          }}
          onChange={(event) => {
            setValue(event.target.value);
            onChange(event.target.value);
          }}
          isValid={isValid}
        />
      ) : (
        type === 'textarea' && (
          <TextArea
            id={name}
            name={name}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              if (!value) {
                setFocused(false);
              }
            }}
            onChange={(event) => {
              setValue(event.target.value);
              onChange(event.target.value);
            }}
            isValid={isValid}
          />
        )
      )}
    </InputContainer>
  );
};
const InputContainer = styled.div`
  position: relative;
  margin: 0 0 2em 0;

  @media (min-width: 992px) {
    margin: 0 0 3em 0;
  }
`;

const Label = styled.label<{ focused: boolean }>`
  position: absolute;
  left: 1em;
  top: 10px;
  color: ${(props) => props.theme.colors.textColorGrey};
  z-index: 10;
  transition: all 150ms ease-out;

  ${(props) =>
    props.focused &&
    css`
      transform: translateY(-125%) translateX(-0.5em);
      font-size: 1em;
      font-weight: bold;
      color: ${(props) => props.theme.colors.textColorBlack};
      background-color: ${(props) => props.theme.colors.background};
      border-radius: 3px;
      padding: 0.2em;
      -webkit-box-shadow: 0 10px 6px -6px #777;
      -moz-box-shadow: 0 10px 6px -6px #777;
      box-shadow: 0 10px 6px -6px #777;

      @media (min-width: 992px) {
        font-size: 0.7em;
        -webkit-box-shadow: 0 7px 6px -6px #777;
        -moz-box-shadow: 0 7px 6px -6px #777;
        box-shadow: 0 7px 6px -6px #777;
      }
    `}
`;

const TextboxCommon = css`
  position: relative;
  padding: 1em 1em 0.7em 1em;
  width: 35%;
  outline: 0;
  border: 0;
  box-shadow: 0 1px 0 0 #e5e5e5;
  transition: all 150ms ease-out;
  border-radius: 5px;
  &:focus {
    box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.secondary};
    width: 45%;

    @media (min-width: 992px) {
      width: 75%;
      box-shadow: 0 4px 4px 0 ${(props) => props.theme.colors.secondary};
    }
  }

  @media (min-width: 992px) {
    width: 60%;
    box-shadow: 2px 2px 0 0 #e5e5e5;
    font-size: 0.7em;
  }
`;

const Textbox = styled.input<{ isValid: boolean }>`
  ${TextboxCommon};

  ${(props) =>
    props.isValid &&
    css`
      box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.primary};

      @media (min-width: 992px) {
        box-shadow: 4px 4px 0 0 ${(props) => props.theme.colors.primary};
      }
    `}
`;

const TextArea = styled.textarea<{ isValid: boolean }>`
  ${TextboxCommon};
  width: 55%;
  height: 6em;

  &:focus {
    box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.secondary};
    width: 65%;

    @media (min-width: 992px) {
      width: 85%;
      box-shadow: 4px 4px 0 0 ${(props) => props.theme.colors.secondary};
    }
  }

  ${(props) =>
    props.isValid &&
    css`
      box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.primary};

      @media (min-width: 992px) {
        box-shadow: 4px 4px 0 0 ${(props) => props.theme.colors.primary};
      }
    `}
`;
