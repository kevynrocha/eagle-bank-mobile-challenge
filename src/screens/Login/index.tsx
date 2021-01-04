import React, { useState, useEffect, useRef } from 'react';
import { Animated, LogBox, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';
import { SubmitHandler, FormHandles } from '@unform/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { login } from '../../services/login';

import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

import * as S from './styles';
import { addUser } from '../../store/modules/user/actions';

interface FormData {
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

  const dispatch = useDispatch();
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

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
      });

      await schema.validate(data, {
        abortEarly: false
      });

      setLoading(true);

      const { message, status, token, user: validUser } = await login({
        email: data.email,
        password: data.password
      });

      if (status >= 400) {
        showMessage({
          message,
          type: 'danger',
          titleStyle: {
            color: '#fafaff'
          }
        });

        setLoading(false);
        return;
      }

      await AsyncStorage.setItem('@eagle_bank:token', token);

      dispatch(
        addUser({
          ...validUser,
          token
        })
      );

      formRef.current?.reset();
      navigation.navigate('Home');

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
