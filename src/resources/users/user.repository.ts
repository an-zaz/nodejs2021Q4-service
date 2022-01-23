import User from './user.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Returns all users
   * @returns users - promise of all users from memory (promise of User[])
   */
  getAll() {
    return this.find();
  }
  /**
   * Returns user with a specific id
   * @param id - user's id (string)
   * @returns user - promise of a user with id passed if found in memory (promise of User instance | undefined)
   */
  getByID(id: string) {
    return this.findOne({ where: { id } });
  }
  /**
   * Returns user with a specific login and password
   * @param login - user's login (string)
   * @param password - user's password (string)
   * @returns user - promise of a user with parameters passed if found in memory (promise of User instance | undefined)
   */
  getByLogin(login:string, password: string) {
    return this.findOne({ where: { login, password } });
  }
  /**
   * Creates user with a name, login, password passed add it to memory
   * @param name - user's name (string)
   * @param login - user's login (string)
   * @param password - user's password (string)
   * @returns user - promise of a user with generated id and parameters passed (promise of User instance)
   */
  createUser(name: string, login: string, password: string) {
    const user = new User();
    user.name = name;
    user.login = login;
    user.password = password;
    return this.save(user);
  }
  /**
   * Finds user by id and updates it by other parameters passed
   * @param id - user's id (string)
   * @param name - user's name (string)
   * @param login - user's login (string)
   * @param password - user's password (string)
   * @returns user - promise of an updated user if it was found (promise of User instance | null)
   */
  async updateById(id: string, name: string, login: string, password: string) {
    const user = await this.findOne(id);
    if (!user) {
      return null;
    }
    user.name = name;
    if (login) {
      user.login = login;
    }
    if (password) {
      user.password = password;
    }
    return this.save(user);
  }

  /**
   * Deletes user with a specific id from memory if found
   * @param id - user's id (string)
   * @returns promise of void - no return value
   */
  async deleteById(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      return;
    }
    await this.remove(user);
  }
}

export default UserRepository;
