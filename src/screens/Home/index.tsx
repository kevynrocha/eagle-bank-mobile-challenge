import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { getUsers } from '../../services/users';
import { removeUser } from '../../store/modules/user/actions';

import ModalContent from './ModalContent';
import UserHeader from './UserHeader';
import UserList from './UserList';

import * as S from './styles';

interface User {
  id: number;
  email: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { name, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers({ token, navigation });
    if (!response) {
      handleLogOut();
      return;
    }
    setUsers(response.users);
    setLoading(false);
  };

  const handleLogOut = () => {
    dispatch(removeUser());
    AsyncStorage.removeItem('@eagle_bank:token');
    setIsVisible(false);
    navigation.navigate('Login');
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  return (
    <S.Wrapper>
      <Modal visible={isVisible} transparent>
        <ModalContent closeModal={handleCloseModal} logOut={handleLogOut} />
      </Modal>
      <UserHeader name={name} openModal={handleOpenModal} />
      <S.Title>
        You token expires in: <S.StrongTitle>30s</S.StrongTitle>
      </S.Title>
      <S.Container>
        <S.StrongTitle>All users:</S.StrongTitle>
        <UserList users={users} loading={loading} />
      </S.Container>
    </S.Wrapper>
  );
};

export default Home;
