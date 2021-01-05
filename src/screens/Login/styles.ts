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
  background-color: #fafafa;
  justify-content: center;
`;

export const AnimatedView = styled.View``;

export const Image = styled.Image.attrs(
  (): ImageProps => ({
    source: ImageLogo,
    resizeMode: 'contain'
  })
)`
  margin: 0 auto;
  width: 100%;
`;

export const TextButton = styled.Text`
  color: #fafafa;
  font-size: 18px;
  text-align: center;
`;

export const Text = styled(TextButton)`
  color: rgba(0, 0, 0, 0.5);
`;

export const TextSignUp = styled(Text)`
  font-weight: bold;
  color: #003573;
`;
export const ButtonSignUp = styled.TouchableOpacity`
  margin-top: 20px;
`;
