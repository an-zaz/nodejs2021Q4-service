import taskRepo from './task.memory.repository';

const getAll = () => taskRepo.getAll();
const getByIDAndBoardID = (taskId: string, boardId: string) =>
  taskRepo.getByIDAndBoardID(taskId, boardId);
const create = (
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
) => taskRepo.create(title, order, description, userId, boardId, columnId);
const updateById = (
  taskId: string,
  title: string,
  order: string,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
) =>
  taskRepo.updateById(
    taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
const deleteById = (taskId: string, boardId: string) =>
  taskRepo.deleteById(taskId, boardId);
const deleteAllByBoardId = (boardId: string) =>
  taskRepo.deleteAllByBoardId(boardId);

export default {
  getAll,
  getByIDAndBoardID,
  create,
  updateById,
  deleteById,
  deleteAllByBoardId,
};
