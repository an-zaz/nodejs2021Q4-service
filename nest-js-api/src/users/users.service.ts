import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './users.repository';
import TasksRepository from '../tasks/tasks.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository,
              private tasksRepository: TasksRepository) {}

  create({ name, login, password }: CreateUserDto) {
    return this.userRepository.createUser(name, login, password);
  }

  findAll() {
    return this.userRepository.getAll();
  }

  findOne(id: string) {
    return this.userRepository.getByID(id);
  }

  update(id: string, { name, login, password } : UpdateUserDto) {
    return this.userRepository.updateById(id, name, login, password);
  }

  async remove(id: string) {
    await this.userRepository.deleteById(id);
    await this.tasksRepository.setUserIdToNull(id);
  }
}
