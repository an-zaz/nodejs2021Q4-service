import Board from './board.model';

const boards: Array<Board> = [];

/**
 * Returns all boards
 * @returns boards - promise of all boards from memory (promise of Board[])
 */
const getAll = async (): Promise<Array<Board>> => boards;
/**
 * Returns a board with a specific id
 * @param id - board's id (string)
 * @returns board - promise of a board with id passed if found in memory (promise of Board instance | undefined)
 */
const getByID = async (id: string): Promise<Board | undefined> =>
  boards.find((board) => board.id === id);
/**
 * Creates a board with title and columns properties and add it to memory
 * @param title - board's title (string)
 * @param columns - board's columns (string[])
 * @returns board - promise of a board with generated id and parameters passed (promise of Board instance)
 */
const create = async (
  title: string,
  columns: Array<string>
): Promise<Board> => {
  const board = new Board({
    title,
    columns,
  });
  boards.push(board);
  return board;
};
/**
 * Finds board id and updates it by other parameters passed
 * @param id - board's id (string)
 * @param title - board's title (string)
 * @param columns - board's columns (string[])
 * @returns board - promise of an updated board if it was found (promise of Board instance | null)
 */
const updateById = async (
  id: string,
  title: string,
  columns: Array<string>
): Promise<null | Board> => {
  const board = await getByID(id);
  if (!board) {
    return null;
  }
  board.title = title;
  board.columns = columns;
  return board;
};
/**
 * Deletes a board with a specific id from memory if found
 * @param id - board's id (string)
 * @returns promise of void - no return value
 */
const deleteById = async (id: string): Promise<void> => {
  const board = await getByID(id);
  if (!board) {
    return;
  }
  boards.splice(boards.indexOf(board), 1);
};

export default { getAll, getByID, create, updateById, deleteById };
