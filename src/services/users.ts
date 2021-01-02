import api from './api';

interface LoginResponse {
  users: { id: number; email: string }[];
}

interface LoginProps {
  token: string;
}

export const getUsers = async ({
  token
}: LoginProps): Promise<LoginResponse> => {
  const { data } = await api.get('users', {
    headers: {
      Authorization: `Bearer ${token} `
    }
  });

  return data;
};
