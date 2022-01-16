import { IUser } from '../../interfaces';

/**
 * Returns a user without its password
 * @returns user - user object without password property (IUser without 'password')
 */
export const toResponse = (user: IUser): Omit<IUser, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
};
