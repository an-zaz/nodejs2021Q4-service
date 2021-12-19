import { v4 as uuidv4 } from 'uuid';
import { IBoard } from '../../interfaces';

/**
 * Represents a board in memory (in kind of Board[]) - creates a board with generated id
 * @param object - with title string and columns string[] properties
 * @returns object instance (board) with id, title string and columns string[] properties
 */
class Board {
  id: string;
  title: string;
  columns: Array<string>;

  constructor({ title, columns = [] }: Omit<IBoard, 'id'>) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
