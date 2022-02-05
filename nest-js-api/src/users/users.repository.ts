import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getAll() {
    return this.find();
  }

  getByID(id: string) {
    return this.findOne({ where: { id } });
  }

  createUser(name: string, login: string, password: string) {
    const user = new User();
    user.name = name;
    user.login = login;
    user.password = password;
    return this.save(user);
  }

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

  async deleteById(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      return;
    }
    await this.remove(user);
  }
}

export default UserRepository;
