import api from './api';

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterSuccess {
  user: User;
}

interface RegisterFailed {
  message: string;
  status: number;
}

export const register = async ({
  name,
  email,
  password
}: RegisterProps): Promise<RegisterSuccess & RegisterFailed> => {
  const { data } = await api.post('users', {
    name,
    email,
    password
  });
  return data;
};
