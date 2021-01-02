import React, { useState, useEffect, useRef } from 'react';
import { Animated, Alert, ActivityIndicator } from 'react-native';
import { Form } from '@unform/mobile';
import { SubmitHandler, FormHandles } from '@unform/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

import { login } from '../../services/login';

import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

import * as S from './styles';

interface FormData {
  email: string;
  password: string;
}

interface ValidationProps {
  [key: string]: string;
}

const Login: React.FC = () => {
  // const buttonTranslateY = useRef(new Animated.Value(300)).current;
  // const buttonOpacity = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const buttonTranslateY = new Animated.Value(300);
  const buttonOpacity = new Animated.Value(0);
  const formOpacity = new Animated.Value(0);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(buttonTranslateY, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500
      }),
      Animated.timing(buttonOpacity, {
        useNativeDriver: true,
        toValue: 1,
        duration: 500
      }),
      Animated.timing(formOpacity, {
        useNativeDriver: true,
        toValue: 1,
        duration: 500
      })
    ]).start();
  }, []);

  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
      });

      await schema.validate(data, {
        abortEarly: false
      });

      setLoading(true);

      const { message, status, token } = await login({
        email: data.email,
        password: data.password
      });

      if (status >= 400) {
        Alert.alert('Error', message);
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem('@eagle_bank:token', token);

      setLoading(false);

      // dispatch para salvar o token
      // redirect para home
    } catch (err) {
      const validationErrors: ValidationProps = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path || ''] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      }
    }
  };

  return (
    <S.KeyboardAvoidingView>
      <S.Image />
      <Animated.View
        style={{
          opacity: buttonOpacity
        }}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="E-mail"
            autoFocus
            autoCapitalize="none"
            keyboardType="email-address"
            autoCompleteType="email"
            textContentType="emailAddress"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <Input
            name="password"
            placeholder="Password"
            secureTextEntry
            autoCompleteType="off"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <Animated.View
            style={{
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }]
            }}
          >
            <Button
              onPress={() => formRef.current?.submitForm()}
              disabled={loading}
            >
              <S.Text>
                {loading ? <ActivityIndicator color="#fafaff" /> : 'Enter'}
              </S.Text>
            </Button>
          </Animated.View>
        </Form>
      </Animated.View>
    </S.KeyboardAvoidingView>
  );
};

export default Login;
