import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto) {
    if (!createBoardDto.title || !createBoardDto.columns) {
      throw new HttpException('Title or/and column field(s) was/were not found',  HttpStatus.BAD_REQUEST);
    }
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (!board) {
      throw new HttpException('Board was not found', HttpStatus.NOT_FOUND);
    }
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const updatedBoard = await this.boardsService.update(id, updateBoardDto);
    if (!updateBoardDto.title || !updateBoardDto.columns) {
      throw new HttpException('Title or/and column field(s) was/were not found',  HttpStatus.BAD_REQUEST);
    }
    if (!updatedBoard) {
      throw new HttpException('Board was not found', HttpStatus.NOT_FOUND);
    }
    return updatedBoard;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (!board) {
      throw new HttpException('Board was not found', HttpStatus.NOT_FOUND);
    }
    return this.boardsService.remove(id);
  }
}
