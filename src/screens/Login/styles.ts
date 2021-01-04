import { ImageProps, KeyboardAvoidingViewProps, Platform } from 'react-native';
import styled from 'styled-components/native';
import ImageLogo from '../../assets/images/logo.png';

const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs(
  (): KeyboardAvoidingViewProps => ({
    behavior
  })
)`
  flex: 1;
  padding: 0 30px;
  background-color: #fafaff;
  justify-content: center;
`;

export const Image = styled.Image.attrs(
  (): ImageProps => ({
    source: ImageLogo,
    resizeMode: 'contain'
  })
)`
  margin: 0 auto;
  width: 100%;
`;

export const Text = styled.Text`
  color: #fafaff;
  font-size: 18px;
  text-align: center;
`;
