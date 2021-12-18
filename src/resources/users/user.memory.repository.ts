import User from './user.model';

const users: Array<User> = [];

const getAll = async () => users;
const getByID = async (id: string) => users.find((user) => user.id === id);
const create = async (name: string, login: string, password: string) => {
  const user = new User({
    name,
    login,
    password,
  });
  users.push(user);
  return user;
};
const updateById = async (
  id: string,
  name: string,
  login: string,
  password: string
) => {
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
const deleteById = async (id: string) => {
  const user = await getByID(id);
  if (!user) {
    return;
  }
  users.splice(users.indexOf(user), 1);
};

export default { getAll, getByID, create, updateById, deleteById };
