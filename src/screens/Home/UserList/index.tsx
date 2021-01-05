import React from 'react';
import { ActivityIndicator } from 'react-native';

import UserItem from '../UserItem';

import * as S from './styles';

interface User {
  id: number;
  email: string;
}
interface UserListProps {
  users: User[];
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, loading }) => {
  if (loading) {
    return <ActivityIndicator color="#003573" size={30} />;
  }

  if (!users?.length) {
    return <S.Title>No have users</S.Title>;
  }

  return (
    <>
      {users.map(user => (
        <UserItem key={user.id} email={user.email} />
      ))}
    </>
  );
};

export default UserList;
