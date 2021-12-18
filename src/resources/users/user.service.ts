import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';

const getAll = () => usersRepo.getAll();
const getByID = (id: string) => usersRepo.getByID(id);
const create = (name: string, login: string, password: string) =>
  usersRepo.create(name, login, password);
const updateById = (
  id: string,
  name: string,
  login: string,
  password: string
) => usersRepo.updateById(id, name, login, password);
const deleteById = (id: string) => {
  usersRepo.deleteById(id);
  tasksRepo.setUserIdToNull(id);
};

export default {
  getAll,
  getByID,
  create,
  updateById,
  deleteById,
};
