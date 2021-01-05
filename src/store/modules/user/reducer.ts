import { ADD_USER, REMOVE_USER, UserAction, User } from './types';

const INITIAL_STATE: User = {
  id: 0,
  name: '',
  email: '',
  token: ''
};

const userReducer = (
  state = INITIAL_STATE,
  action: UserAction
): Partial<User> => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
