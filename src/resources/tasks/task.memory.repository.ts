import Task from './task.model';

const tasks: Array<Task> = [];

/**
 * Returns all tasks
 * @returns tasks - promise of all tasks from memory (promise of Task[])
 */
const getAll = async (): Promise<Array<Task>> => tasks;
/**
 * Returns a task with a specific board and task ids
 * @param taskId - task's id (string)
 * @param boardId - board's id (string)
 * @returns task - promise of a task with ids passed if found in memory (promise of Task instance | undefined)
 */
const getByIDAndBoardID = async (
  taskId: string,
  boardId: string
): Promise<Task | undefined> =>
  tasks.find((task) => task.id === taskId && task.boardId === boardId);
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
const create = async (
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
): Promise<Task> => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  tasks.push(task);
  return task;
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
const updateById = async (
  taskId: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
): Promise<null | Task> => {
  const task = await getByIDAndBoardID(taskId, boardId);
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
  return task;
};
/**
 * Deletes a task with a specific board and task ids from memory if found
 * @param taskId - task's id (string)
 * @param boardId - task's boardId (string)
 * @returns promise of void - no return value
 */
const deleteById = async (taskId: string, boardId: string): Promise<void> => {
  const task = await getByIDAndBoardID(taskId, boardId);
  if (!task) {
    return;
  }
  tasks.splice(tasks.indexOf(task), 1);
};
/**
 * Deletes tasks with a specific board id from memory if found
 * @param boardId - task's boardId (string)
 * @returns promise of void - no return value
 */
const deleteAllByBoardId = async (boardId: string): Promise<void> => {
  const tasksForDelete = tasks.filter((task) => task.boardId === boardId);
  if (!tasksForDelete.length) {
    return;
  }
  tasksForDelete.forEach((task) => tasks.splice(tasks.indexOf(task), 1));
};
/**
 * Finds tasks with a specific userId and set its userId to null if found
 * @param userId - task's userId (string)
 * @returns promise of void - no return value
 */
const setUserIdToNull = async (userId: string): Promise<void> => {
  tasks.forEach((task) => {
    if (task.userId === userId) {
      task.setUserId(null);
    }
    return task;
  });
};

export default {
  getAll,
  getByIDAndBoardID,
  create,
  updateById,
  deleteById,
  deleteAllByBoardId,
  setUserIdToNull,
};
