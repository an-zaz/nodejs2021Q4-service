import Board from './board.model';
import { EntityRepository, Repository } from 'typeorm';
import { IColumn } from '../../interfaces';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
  /**
   * Returns all boards
   * @returns boards - promise of all boards from memory (promise of Board[])
   */
  getAll() {
    return this.find();
  }
  /**
   * Returns a board with a specific id
   * @param id - board's id (string)
   * @returns board - promise of a board with id passed if found in memory (promise of Board instance | undefined)
   */
  getByID(id: string) {
    return this.findOne({ where: { id } });
  }
  /**
   * Creates a board with title and columns properties and add it to memory
   * @param title - board's title (string)
   * @param columns - board's columns (string[])
   * @returns board - promise of a board with generated id and parameters passed (promise of Board instance)
   */
  createBoard(title: string, columns: Array<IColumn>) {
    const board = new Board();
    board.title = title;
    board.columns = columns;
    return this.save(board);
  }
  /**
   * Finds board id and updates it by other parameters passed
   * @param id - board's id (string)
   * @param title - board's title (string)
   * @param columns - board's columns (string[])
   * @returns board - promise of an updated board if it was found (promise of Board instance | null)
   */

  async updateById(id: string, title: string, columns: Array<IColumn>) {
    const board = await this.getByID(id);
    if (!board) {
      return null;
    }
    board.title = title;
    board.columns = columns;
    return this.save(board);
  }
  /**
   * Deletes a board with a specific id from memory if found
   * @param id - board's id (string)
   * @returns promise of void - no return value
   */
  async deleteById(id: string) {
    const board = await this.getByID(id);
    if (!board) {
      return;
    }
    await this.remove(board);
  }
}

export default BoardsRepository;
