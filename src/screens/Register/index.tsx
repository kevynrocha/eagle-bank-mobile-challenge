/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import { Animated, LogBox, ActivityIndicator } from 'react-native';
import { Form } from '@unform/mobile';
import { SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { register } from '../../services/register';
import { registerSchema } from '../../validations/register';

import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

import * as S from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface ValidationProps {
  [key: string]: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const formOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(300)).current;

  const navigation = useNavigation();

  LogBox.ignoreLogs([
    'Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).'
  ]);

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

      await registerSchema.validate(data, {
        abortEarly: false
      });

      setLoading(true);

      const user = {
        name: data.name,
        email: data.email,
        password: data.password
      };

      const { message, status } = await register(user);

      if (status >= 400) {
        showMessage({
          message,
          type: 'danger',
          titleStyle: {
            color: '#fafafa'
          }
        });

        setLoading(false);
        return;
      }

      formRef.current?.reset();
      showMessage({
        message: 'User created',
        type: 'success',
        titleStyle: {
          color: '#fafafa'
        }
      });
      navigation.navigate('Login');

      setLoading(false);
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

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <S.KeyboardAvoidingView>
      <S.Image />
      <S.AnimatedView
        as={Animated.View}
        style={{
          opacity: buttonOpacity
        }}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Name" returnKeyType="next" />
          <Input
            name="email"
            placeholder="E-mail"
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

          <S.AnimatedView
            as={Animated.View}
            style={{
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }]
            }}
          >
            <Button
              onPress={() => formRef.current?.submitForm()}
              disabled={loading}
            >
              <S.TextButton>
                {loading ? <ActivityIndicator color="#fafaff" /> : 'Register'}
              </S.TextButton>
            </Button>
            <S.ButtonSignUp onPress={handleNavigateToLogin}>
              <S.Text>
                Back to
                <S.TextSignUp> Login</S.TextSignUp>
              </S.Text>
            </S.ButtonSignUp>
          </S.AnimatedView>
        </Form>
      </S.AnimatedView>
    </S.KeyboardAvoidingView>
  );
};

export default Login;
