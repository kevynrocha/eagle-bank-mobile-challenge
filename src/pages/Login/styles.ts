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
  padding: 30px;
  background-color: #fafaff;
  justify-content: center;
`;

export const Image = styled.Image.attrs(
  (): ImageProps => ({
    source: ImageLogo,
    resizeMode: 'contain'
  })
)`
  max-width: 100%;
  margin: 0 auto;
`;

export const Text = styled.Text`
  color: #fafaff;
  font-size: 18px;
  text-align: center;
`;
