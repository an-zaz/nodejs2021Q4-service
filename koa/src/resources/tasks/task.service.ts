import { TasksRepository } from './task.repository';
import { getConnection } from 'typeorm';

/**
 * Returns all tasks
 * @returns tasks - promise of all tasks from memory (promise of Task[])
 */
const getAll = () => {
  const taskRepo =
    getConnection('postgresConnection').getCustomRepository(TasksRepository);
  return taskRepo.getAll();
};
/**
 * Returns a task with a specific board and task ids
 * @param taskId - task's id (string)
 * @param boardId - board's id (string)
 * @returns task - promise of a task with ids passed if found in memory (promise of Task instance | undefined)
 */
const getByIDAndBoardID = (taskId: string, boardId: string) => {
  const taskRepo =
    getConnection('postgresConnection').getCustomRepository(TasksRepository);
  return taskRepo.getByIDAndBoardID(taskId, boardId);
};

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
const create = (
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
) => {
  const taskRepo =
    getConnection('postgresConnection').getCustomRepository(TasksRepository);
  return taskRepo.createTask(
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
};
/**
 * Find task by board and task ids and updates it by other parameters passed
 * @param taskId - task's id (string)
 * @param title - task's title (string)
 * @param order - task's order (string)
 * @param description - task's description (string)
 * @param userId - task's userId (string)
 * @param boardId - task's boardId (string)
 * @param columnId - task's columnId (string)
 * @returns task - promise of an updated task if it was found (promise of Task instance | null)
 */
const updateById = (
  taskId: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
) => {
  const taskRepo =
    getConnection('postgresConnection').getCustomRepository(TasksRepository);
  return taskRepo.updateById(
    taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
};
/**
 * Deletes a task with a specific board and task ids from memory if found
 * @param taskId - task's id (string)
 * @param boardId - task's boardId (string)
 * @returns promise of void - no return value
 */
const deleteById = async (taskId: string, boardId: string) => {
  const taskRepo =
    getConnection('postgresConnection').getCustomRepository(TasksRepository);
  await taskRepo.deleteById(taskId, boardId);
};

/**
 * Deletes tasks with a specific board id from memory if found
 * @param boardId - task's boardId (string)
 * @returns promise of void - no return value
 */
const deleteAllByBoardId = async (boardId: string) => {
  const taskRepo =
    getConnection('postgresConnection').getCustomRepository(TasksRepository);
  await taskRepo.deleteAllByBoardId(boardId);
};

export default {
  getAll,
  getByIDAndBoardID,
  create,
  updateById,
  deleteById,
  deleteAllByBoardId,
};
