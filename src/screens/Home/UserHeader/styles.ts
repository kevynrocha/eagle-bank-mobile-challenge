import { TextProps } from 'react-native';
import styled from 'styled-components/native';

export const Title = styled.Text.attrs(
  (): TextProps => ({
    numberOfLines: 1
  })
)`
  flex: 1;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
  padding-right: 10px;
`;

export const StrongTitle = styled(Title)`
  font-weight: bold;
`;

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonTitle = styled.Text`
  color: red;
`;

export const Button = styled.TouchableOpacity`
  border: 1px solid red;
  border-radius: 4px;
  padding: 5px 20px;
`;
