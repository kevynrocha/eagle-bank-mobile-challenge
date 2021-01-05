export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

export type UserAction = AddUserAction | RemoveUserAction;
