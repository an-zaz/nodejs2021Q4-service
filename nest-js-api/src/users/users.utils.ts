import { User } from './entities/user.entity';

export const toResponse = (user: User): Omit<User, 'password' | 'tasks'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
