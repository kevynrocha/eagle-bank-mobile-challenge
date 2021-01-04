import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const Container = styled.View`
  background-color: #fafafa;
  padding: 20px;
  border-radius: 8px;
  flex-direction: column;
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

export const ButtonModal = styled.TouchableOpacity`
  border: 1px solid #003573;
  border-radius: 4px;
  padding: 5px 20px;
`;
