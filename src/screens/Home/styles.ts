import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Container = styled.View`
  margin: 20px 0;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
`;

export const StrongTitle = styled(Title)`
  font-weight: bold;
`;

export const FlexRow = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonTitle = styled.Text`
  color: red;
`;

export const Button = styled.TouchableOpacity`
  border: 1px solid red;
  border-radius: 4px;
  padding: 5px 20px;
`;
