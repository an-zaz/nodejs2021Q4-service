import { getConnection } from 'typeorm';
import { TasksRepository } from '../tasks/task.memory.repository';
import { BoardsRepository } from './board.memory.repository';

/**
 * Returns all boards
 * @returns boards - promise of all boards from memory (promise of Board[])
 */
const getAll = () => {
  const boardsRepo =
    getConnection('postgresConnection').getCustomRepository(BoardsRepository);
  return boardsRepo.getAll();
};
/**
 * Returns a board with a specific id
 * @param id - board's id (string)
 * @returns board - promise of a board with id passed if found in memory (promise of Board instance | undefined)
 */
const getByID = (id: string) => {
  const boardsRepo =
    getConnection('postgresConnection').getCustomRepository(BoardsRepository);
  return boardsRepo.getByID(id);
};
/**
 * Creates a board with title and columns properties and add it to memory
 * @param title - board's title (string)
 * @param columns - board's columns (string[])
 * @returns board - promise of a board with generated id and parameters passed (promise of Board instance)
 */
const create = (title: string, columns: Array<string>) => {
  const boardsRepo =
    getConnection('postgresConnection').getCustomRepository(BoardsRepository);
  return boardsRepo.createBoard(title, columns);
};
/**
 * Finds board id and updates it by other parameters passed
 * @param id - board's id (string)
 * @param title - board's title (string)
 * @param columns - board's columns (string[])
 * @returns board - promise of an updated board if it was found (promise of Board instance | null)
 */
const updateById = (id: string, title: string, columns: Array<string>) => {
  const boardsRepo =
    getConnection('postgresConnection').getCustomRepository(BoardsRepository);
  return boardsRepo.updateById(id, title, columns);
};
/**
 * Deletes a board with a specific id and tasks with that boardId from memory if found
 * @param id - board's id (string)
 * @returns promise of void - no return value
 */
const deleteById = async (id: string) => {
  const boardsRepo =
    getConnection('postgresConnection').getCustomRepository(BoardsRepository);
  const tasksRepo =
    getConnection('postgresConnection').getCustomRepository(TasksRepository);
  await boardsRepo.deleteById(id);
  await tasksRepo.deleteAllByBoardId(id);
};

export default { getAll, getByID, create, updateById, deleteById };
