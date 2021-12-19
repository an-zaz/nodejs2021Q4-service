import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';

/**
 * Returns all users
 * @returns users - promise of all users from memory (promise of User[])
 */
const getAll = () => usersRepo.getAll();
/**
 * Returns user with a specific id
 * @param id - user's id (string)
 * @returns user - promise of a user with id passed if found in memory (promise of User instance | undefined)
 */
const getByID = (id: string) => usersRepo.getByID(id);
/**
 * Creates user with a name, login, password passed add it to memory
 * @param name - user's name (string)
 * @param login - user's login (string)
 * @param password - user's password (string)
 * @returns user - promise of a user with generated id and parameters passed (promise of User instance)
 */
const create = (name: string, login: string, password: string) =>
  usersRepo.create(name, login, password);
/**
 * Find user by id and updates it by other parameters passed
 * @param id - user's id (string)
 * @param name - user's name (string)
 * @param login - user's login (string)
 * @param password - user's password (string)
 * @returns user - promise of an updated user if it was found (promise of User instance | null)
 */
const updateById = (
  id: string,
  name: string,
  login: string,
  password: string
) => usersRepo.updateById(id, name, login, password);
/**
 * Deletes user with a specific id from memory and set its tasks' userId to null
 * @param id - user's id (string)
 * @returns promise of void - no return value
 */
const deleteById = async (id: string) => {
  await usersRepo.deleteById(id);
  await tasksRepo.setUserIdToNull(id);
};

export default { getAll, getByID, create, updateById, deleteById };
