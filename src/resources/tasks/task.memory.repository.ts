import Task from './task.model';

const tasks: Array<Task> = [];

const getAll = async () => tasks;
const getByIDAndBoardID = async (taskId: string, boardId: string) =>
  tasks.find((task) => task.id === taskId && task.boardId === boardId);
const create = async (
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
) => {
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
const updateById = async (
  taskId: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
) => {
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
const deleteById = async (taskId: string, boardId: string) => {
  const task = await getByIDAndBoardID(taskId, boardId);
  if (!task) {
    return;
  }
  tasks.splice(tasks.indexOf(task), 1);
};
const deleteAllByBoardId = (boardId: string) => {
  const tasksForDelete = tasks.filter((task) => task.boardId === boardId);
  if (!tasksForDelete.length) {
    return;
  }
  tasksForDelete.forEach((task) => tasks.splice(tasks.indexOf(task), 1));
};

const setUserIdToNull = (userId: string) => {
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
