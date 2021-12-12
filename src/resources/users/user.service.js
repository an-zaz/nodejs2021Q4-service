const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const getByID = (id) => usersRepo.getByID(id);
const create = (name, login, password) => usersRepo.create(name, login, password);
const updateById = (id, name, login, password) => usersRepo.updateById(id, name, login, password);
const deleteById =  (id) => {
     usersRepo.deleteById(id);
     tasksRepo.setUserIdToNull(id);
}

module.exports = { getAll, getByID, create, updateById, deleteById };
