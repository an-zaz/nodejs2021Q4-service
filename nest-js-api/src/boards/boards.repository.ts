
import { EntityRepository, Repository } from 'typeorm';
import { IColumn } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {

  getAll() {
    return this.find();
  }

  getByID(id: string) {
    return this.findOne({ where: { id } });
  }

  createBoard(title: string, columns: Array<IColumn>) {
    const board = new Board();
    board.title = title;
    board.columns = columns;
    return this.save(board);
  }

  async updateById(id: string, title: string, columns: Array<IColumn>) {
    const board = await this.getByID(id);
    if (!board) {
      return null;
    }
    board.title = title;
    board.columns = columns;
    return this.save(board);
  }

  async deleteById(id: string) {
    const board = await this.getByID(id);
    if (!board) {
      return;
    }
    await this.remove(board);
  }
}

export default BoardsRepository;
