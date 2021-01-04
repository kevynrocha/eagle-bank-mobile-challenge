import React, { useEffect, useRef } from 'react';

import { TextInput, TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import * as S from './styles';

interface InputProps extends TextInputProps {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<TextInput & TextInputProps>(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        const currentRef = ref;
        currentRef.value = '';
        currentRef.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      <S.Input
        ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
      {error && <S.TextError>{error}</S.TextError>}
    </>
  );
};

export default Input;
