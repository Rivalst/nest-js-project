import { User } from './user.entity';
import { USER_REPOSITORY } from '../common/constant';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
