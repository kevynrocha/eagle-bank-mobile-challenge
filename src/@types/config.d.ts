import { User } from '../store/modules/user/types';

type AppStore = {
  user: User;
};

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends AppStore {}
}
