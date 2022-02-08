import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import TasksRepository from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  create({title,
           order,
           description,
           userId,
           boardId,
           columnId}: CreateTaskDto) {
    return this.tasksRepository.createTask(
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    );
  }

  findAll() {
    return this.tasksRepository.getAll();
  }

  findOne(taskId: string, boardId: string) {
    return this.tasksRepository.getByIDAndBoardID(taskId, boardId);
  }

  update(taskId: string, {title,
    order,
    description,
    userId,
    boardId,
    columnId}: UpdateTaskDto) {
    return this.tasksRepository.updateById(
      taskId,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    );
  }

  removeOne(taskId: string, boardId: string) {
    return this.tasksRepository.deleteById(taskId, boardId);
  }

  async removeAllByBoardId(boardId: string) {
    await this.tasksRepository.deleteAllByBoardId(boardId);
  };
}
