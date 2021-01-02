import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

const Button: React.FC<TouchableOpacityProps> = ({ children, ...props }) => {
  return <S.Button {...props}>{children}</S.Button>;
};

export default Button;
