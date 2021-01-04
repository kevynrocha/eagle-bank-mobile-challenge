import React from 'react';

import * as S from './styles';

interface UserItemProps {
  email: string;
}

const UserItem: React.FC<UserItemProps> = ({ email }) => {
  return (
    <S.Container>
      <S.Title>{email}</S.Title>
    </S.Container>
  );
};

export default UserItem;
