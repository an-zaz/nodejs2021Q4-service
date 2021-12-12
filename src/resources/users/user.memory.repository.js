const User = require('./user.model');

const users = [];

const getAll = async () => users;
const getByID = async (id) => users.find((user) => user.id === id)
const create = async (name, login, password) => {
    const user = new User({
        name,
        login,
        password,
    });
    users.push(user);
    return user;
}
const updateById = async (id, name, login, password) => {
    const user = await getByID(id);
    if (!user) {
        return null
    }
    user.name = name;
    if (login) {
        user.login = login;
    }
    if (password) {
        user.password = password;
    }
    return user;
}
const deleteById = async (id) => {
    const user = await getByID(id);
    if (!user) {
        return;
    }
    users.splice(users.indexOf(user), 1);
}

module.exports = { getAll, getByID, create, updateById, deleteById };
