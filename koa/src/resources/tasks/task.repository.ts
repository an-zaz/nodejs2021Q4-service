import Task from './task.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  /**
   * Returns all tasks
   * @returns tasks - promise of all tasks from memory (promise of Task[])
   */
  getAll() {
    return this.find();
  }

  /**
   * Returns a task with a specific board and task ids
   * @param taskId - task's id (string)
   * @param boardId - board's id (string)
   * @returns task - promise of a task with ids passed if found in memory (promise of Task instance | undefined)
   */

  getByIDAndBoardID(taskId: string, boardId: string) {
    return this.findOne({ where: { id: taskId, boardId: boardId } });
  }

  /**
   * Creates a task with properties of parameters passed and add it to memory
   * @param title - task's title (string)
   * @param order - task's order (string)
   * @param description - task's description (string)
   * @param userId - task's userId (string)
   * @param boardId - task's boardId (string)
   * @param columnId - task's columnId (string)
   * @returns task - promise of a task with generated id and parameters passed (promise of Task instance)
   */
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

  /**
   * Finds task by board and task ids and updates it by other parameters passed
   * @param taskId - task's id (string)
   * @param title - task's title (string)
   * @param order - task's order (string)
   * @param description - task's description (string)
   * @param userId - task's userId (string)
   * @param boardId - task's boardId (string)
   * @param columnId - task's columnId (string)
   * @returns task - promise of an updated task if it was found (promise of Task instance | null)
   */
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

  /**
   * Deletes a task with a specific board and task ids from memory if found
   * @param taskId - task's id (string)
   * @param boardId - task's boardId (string)
   * @returns promise of void - no return value
   */
  async deleteById(taskId: string, boardId: string) {
    const task = await this.getByIDAndBoardID(taskId, boardId);
    if (!task) {
      return;
    }
    await this.remove(task);
  }

  /**
   * Deletes tasks with a specific board id from memory if found
   * @param boardId - task's boardId (string)
   * @returns promise of void - no return value
   */
  async deleteAllByBoardId(boardId: string) {
    const tasksForDelete = await this.find({ where: { boardId } });
    if (!tasksForDelete.length) {
      return;
    }
    await this.remove(tasksForDelete);
  }

  /**
   * Finds tasks with a specific userId and set its userId to null if found
   * @param userId - task's userId (string)
   * @returns promise of void - no return value
   */

  async setUserIdToNull(userId: string) {
    await this.update({ userId: userId }, { userId: null });
  }
}

export default TasksRepository;
