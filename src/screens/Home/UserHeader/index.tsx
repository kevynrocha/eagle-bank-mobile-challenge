import React from 'react';

import * as S from './styles';

interface UserHeaderProps {
  email: string;
  openModal: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ email, openModal }) => {
  return (
    <S.FlexRow>
      <S.Title>
        Hello, <S.StrongTitle>{email}</S.StrongTitle>
      </S.Title>
      <S.Button onPress={() => openModal()}>
        <S.ButtonTitle>LogOut</S.ButtonTitle>
      </S.Button>
    </S.FlexRow>
  );
};

export default UserHeader;
