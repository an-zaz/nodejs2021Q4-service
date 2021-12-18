import { v4 as uuidv4 } from 'uuid';
import { IBoard } from '../../interfaces';

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
