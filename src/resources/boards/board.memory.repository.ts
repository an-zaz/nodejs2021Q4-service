import Board from './board.model';

const boards: Array<Board> = [];

const getAll = async () => boards;
const getByID = async (id: string) => boards.find((board) => board.id === id);
const create = async (title: string, columns: Array<string>) => {
  const board = new Board({
    title,
    columns,
  });
  boards.push(board);
  return board;
};
const updateById = async (
  id: string,
  title: string,
  columns: Array<string>
) => {
  const board = await getByID(id);
  if (!board) {
    return null;
  }
  board.title = title;
  board.columns = columns;
  return board;
};
const deleteById = async (id: string) => {
  const board = await getByID(id);
  if (!board) {
    return;
  }
  boards.splice(boards.indexOf(board), 1);
};

export default { getAll, getByID, create, updateById, deleteById };
