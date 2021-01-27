import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export interface TextInputProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  required: boolean;
  onChange: (newValue: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type,
  required,
  onChange,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <InputContainer>
      <Label htmlFor={name} focused={focused}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Label>
      {['text', 'email'].includes(type) ? (
        <Textbox
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
          value={value}
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
            value={value}
          />
        )
      )}
    </InputContainer>
  );
};
const InputContainer = styled.div`
  position: relative;
  margin: 0 0 2em 0;
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
    `}
`;

const TextboxCommon = css`
  position: relative;
  padding: 12px 1em 5px 1em;
  width: 35%;
  outline: 0;
  border: 0;
  box-shadow: 0 1px 0 0 #e5e5e5;
  transition: all 150ms ease-out;
  border-radius: 5px;
  &:focus {
    box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.secondary};
    width: 45%;
  }
`;

const Textbox = styled.input<{ value: string }>`
  ${TextboxCommon};

  ${(props) =>
    props.value &&
    css`
      box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.primary};
    `}
`;

const TextArea = styled.textarea<{ value: string }>`
  ${TextboxCommon};
  width: 55%;
  height: 6em;

  &:focus {
    box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.secondary};
    width: 65%;
  }

  ${(props) =>
    props.value &&
    css`
      box-shadow: 0 4px 0 0 ${(props) => props.theme.colors.primary};
    `}
`;
