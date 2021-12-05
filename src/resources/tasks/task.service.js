const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();
const getByIDAndBoardID = (taskId, boardId) => taskRepo.getByIDAndBoardID(taskId, boardId);
const create = (title, order, description, userId, boardId, columnId) => taskRepo.create(title, order, description, userId, boardId, columnId);
const updateById = (taskId, title, order, description, userId, boardId, columnId) => taskRepo.updateById(taskId, title, order, description, userId, boardId, columnId);
const deleteById = (taskId, boardId) => taskRepo.deleteById(taskId, boardId);
const deleteAllByBoardId = (boardId) => taskRepo.deleteAllByBoardId( boardId);

module.exports = { getAll, getByIDAndBoardID, create, updateById, deleteById, deleteAllByBoardId };
