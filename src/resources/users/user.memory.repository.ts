import User from './user.model';

const users: Array<User> = [];

/**
 * Returns all users
 * @returns users - promise of all users from memory (promise of User[])
 */
const getAll = async (): Promise<User[]> => users;
/**
 * Returns user with a specific id
 * @param id - user's id (string)
 * @returns user - promise of a user with id passed if found in memory (promise of User instance | undefined)
 */
const getByID = async (id: string): Promise<User | undefined> =>
  users.find((user) => user.id === id);
/**
 * Creates user with a name, login, password passed add it to memory
 * @param name - user's name (string)
 * @param login - user's login (string)
 * @param password - user's password (string)
 * @returns user - promise of a user with generated id and parameters passed (promise of User instance)
 */
const create = async (
  name: string,
  login: string,
  password: string
): Promise<User> => {
  const user = new User({
    name,
    login,
    password,
  });
  users.push(user);
  return user;
};
/**
 * Find user by id and updates it by other parameters passed
 * @param id - user's id (string)
 * @param name - user's name (string)
 * @param login - user's login (string)
 * @param password - user's password (string)
 * @returns user - promise of an updated user if it was found (promise of User instance | null)
 */
const updateById = async (
  id: string,
  name: string,
  login: string,
  password: string
): Promise<User | null> => {
  const user = await getByID(id);
  if (!user) {
    return null;
  }
  user.name = name;
  if (login) {
    user.login = login;
  }
  if (password) {
    user.password = password;
  }
  return user;
};
/**
 * Deletes user with a specific id from memory if found
 * @param id - user's id (string)
 * @returns promise of void - no return value
 */
const deleteById = async (id: string): Promise<void> => {
  const user = await getByID(id);
  if (!user) {
    return;
  }
  users.splice(users.indexOf(user), 1);
};

export default { getAll, getByID, create, updateById, deleteById };
