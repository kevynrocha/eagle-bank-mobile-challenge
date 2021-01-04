import { User } from '../store/modules/user/types';

type AppStore = {
  user: User;
};

declare module 'react-redux' {
  interface DefaultRootState extends AppStore {}
}
