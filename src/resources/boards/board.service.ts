import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';

const getAll = () => boardsRepo.getAll();
const getByID = (id: string) => boardsRepo.getByID(id);
const create = (title: string, columns: Array<string>) =>
  boardsRepo.create(title, columns);
const updateById = (id: string, title: string, columns: Array<string>) =>
  boardsRepo.updateById(id, title, columns);
const deleteById = (id: string) => {
  boardsRepo.deleteById(id);
  tasksRepo.deleteAllByBoardId(id);
};

export default { getAll, getByID, create, updateById, deleteById };
