import { ADD_USER, REMOVE_USER, User, UserAction } from './types';

export const addUser = (payload: User): UserAction => ({
  type: ADD_USER,
  payload
});

export const removeUser = (): UserAction => ({
  type: REMOVE_USER
});
