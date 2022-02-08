import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import BoardsRepository from './boards.repository';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository,
private tasksService: TasksService) {}

  create({ title, columns }: CreateBoardDto) {
    return this.boardsRepository.createBoard(title, columns);
  }

  findAll() {
    return this.boardsRepository.getAll();
  }

  findOne(id: string) {
    return this.boardsRepository.getByID(id);
  }

  update(id: string, { title, columns }: UpdateBoardDto) {
    return this.boardsRepository.updateById(id, title, columns);
  }

  async remove(id: string) {
   await this.boardsRepository.deleteById(id);
   await this.tasksService.removeAllByBoardId(id);
  }
}
