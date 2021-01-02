import api from './api';

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  status: number;
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export const login = async ({
  email,
  password
}: LoginProps): Promise<LoginResponse> => {
  const { data } = await api.post('sessions', {
    email,
    password
  });
  return data;
};
