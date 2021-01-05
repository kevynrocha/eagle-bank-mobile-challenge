import api from './api';

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}
interface LoginProps {
  email: string;
  password: string;
}

interface LoginSuccess {
  user: User;
}

interface LoginFailed {
  message: string;
  status: number;
}

export const login = async ({
  email,
  password
}: LoginProps): Promise<LoginSuccess & LoginFailed> => {
  const { data } = await api.post('sessions', {
    email,
    password
  });
  return data;
};
