const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getByID = (id) => boardsRepo.getByID(id);
const create = (title, columns) => boardsRepo.create(title, columns);
const updateById = (id, title, columns) => boardsRepo.updateById(id, title, columns);
const deleteById = (id) => boardsRepo.deleteById(id);

module.exports = { getAll, getByID, create, updateById, deleteById };
