import { EntityRepository, Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  getAll() {
    return this.find();
  }

  getByIDAndBoardID(taskId: string, boardId: string) {
    return this.findOne({ where: { id: taskId, boardId: boardId } });
  }

  createTask(
    title: string,
    order: number,
    description: string,
    userId: string,
    boardId: string,
    columnId: string
  ) {
    const task = new Task();
    task.title = title;
    task.order = order;
    task.description = description;
    task.userId = userId;
    task.boardId = boardId;
    task.columnId = columnId;
    return this.save(task);
  }

  async updateById(
    taskId: string,
    title: string,
    order: number,
    description: string,
    userId: string,
    boardId: string,
    columnId: string
  ) {
    const task = await this.getByIDAndBoardID(taskId, boardId);
    if (!task) {
      return null;
    }
    task.order = order;
    task.boardId = boardId;
    task.columnId = columnId;
    if (title) {
      task.title = title;
    }
    if (userId) {
      task.userId = userId;
    }
    if (description) {
      task.description = description;
    }
    return this.save(task);
  }

  async deleteById(taskId: string, boardId: string) {
    const task = await this.getByIDAndBoardID(taskId, boardId);
    if (!task) {
      return;
    }
    await this.remove(task);
  }

  async deleteAllByBoardId(boardId: string) {
    const tasksForDelete = await this.find({ where: { boardId } });
    if (!tasksForDelete.length) {
      return;
    }
    await this.remove(tasksForDelete);
  }

  async setUserIdToNull(userId: string) {
    await this.update({ userId: userId }, { userId: null });
  }
}

export default TasksRepository;
