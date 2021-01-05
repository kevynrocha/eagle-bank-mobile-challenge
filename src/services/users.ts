import { showMessage } from 'react-native-flash-message';
import api from './api';

interface User {
  id: number;
  name: string;
  email: string;
}
interface LoginResponse {
  users: User[];
}

interface LoginProps {
  token: string;
  navigation: {
    navigate: (_route: string) => void;
  };
}

export const getUsers = async ({
  token,
  navigation
}: LoginProps): Promise<LoginResponse | undefined> => {
  try {
    const response = await api.get('users', {
      headers: {
        Authorization: `Bearer ${token} `
      }
    });

    if (response.status >= 400) {
      showMessage({
        message: response.data.message,
        type: 'danger'
      });
      navigation.navigate('Login');
    }

    return response.data;
  } catch (e) {
    showMessage({
      message: e.message,
      type: 'danger'
    });
    navigation.navigate('Login');
  }
};
