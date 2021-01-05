import React from 'react';

import * as S from './styles';

interface UserHeaderProps {
  name: string;
  openModal: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, openModal }) => {
  return (
    <S.FlexRow>
      <S.Title>
        Hello, <S.StrongTitle>{name}</S.StrongTitle>
      </S.Title>
      <S.Button onPress={() => openModal()}>
        <S.ButtonTitle>Logout</S.ButtonTitle>
      </S.Button>
    </S.FlexRow>
  );
};

export default UserHeader;
