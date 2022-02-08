import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './users.repository';
import TasksRepository from '../tasks/tasks.repository';
import * as jwt from "jsonwebtoken";
import { checkHashPassword, hashPassword } from './utils/hashHelper';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository,
              private tasksRepository: TasksRepository) {}

  async create({ name, login, password }: CreateUserDto) {
    const hashedPassword = await hashPassword(password);
    return this.userRepository.createUser(name, login, hashedPassword);
  }

  findAll() {
    return this.userRepository.getAll();
  }

  findOne(id: string) {
    return this.userRepository.getByID(id);
  }

  async update(id: string, { name, login, password } : UpdateUserDto) {
    const hashedPassword = await hashPassword(password);
    return this.userRepository.updateById(id, name, login, hashedPassword);
  }

  async remove(id: string) {
    await this.userRepository.deleteById(id);
    await this.tasksRepository.setUserIdToNull(id);
  }

  async login(login:string, password: string) {
    const user = await this.userRepository.getByLogin( login );
    if (!user) {
      return null;
    } else {
      const { id, login, password: hashedPassword } = user;
      if (!await checkHashPassword(password, hashedPassword)) {
        return null;
      }
      return { token: jwt.sign({ id, login }, process.env.JWT_SECRET_KEY as string) };
    }
  }
}
