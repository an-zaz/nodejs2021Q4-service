import { IUser } from '../../interfaces';

export const toResponse = (user: IUser): Omit<IUser, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
