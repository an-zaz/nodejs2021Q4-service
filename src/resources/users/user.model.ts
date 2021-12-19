import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../interfaces';

/**
 * Represents a user in memory (in kind of User[]) - creates a user with id, login, name, password string properties
 * @param object - with name, login, password string properties
 * @returns object instance (user) with id, login, name, password string properties
 */
class User {
  readonly id: string;
  name: string;
  login: string;
  password: string;

  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Omit<IUser, 'id'>) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }
  /**
   * Returns a user without its password
   * @returns user - user object without password property (IUser without 'password')
   */
  toResponse(): Omit<IUser, 'password'> {
    const { id, name, login } = this;
    return { id, name, login };
  }
}

export default User;
