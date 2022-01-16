import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a user in memory (in kind of User[]) - creates a user with id, login, name, password string properties
 * @param object - with name, login, password string properties
 * @returns object instance (user) with id, login, name, password string properties
 */
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column()
  name: string;
  @Column()
  login: string;
  @Column()
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
