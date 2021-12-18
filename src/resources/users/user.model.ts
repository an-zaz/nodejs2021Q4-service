import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../interfaces';

class User {
  id: string;
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

  toResponse(): Omit<IUser, 'password'> {
    const { id, name, login } = this;
    return { id, name, login };
  }
}

export default User;
