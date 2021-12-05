const Board = require('./board.model');

const boards = [];

const getAll = async () => boards;
const getByID = async (id) => boards.find((board) => board.id === id)
const create = async (title, columns) => {
    const board = new Board({
        title,
        columns,
    });
    boards.push(board);
    return board;
}
const updateById = async (id, title, columns) => {
    const board = await getByID(id);
    if (!board) {
        return null
    }
    board.title = title;
    board.columns = columns;
    return board;
}
const deleteById = async (id) => {
    const board = await getByID(id);
    if (!board) {
        return;
    }
    boards.splice(boards.indexOf(board), 1);
}

module.exports = { getAll, getByID, create, updateById, deleteById };
