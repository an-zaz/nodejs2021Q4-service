import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Put
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    if (
      !createTaskDto.title ||
      createTaskDto.order === undefined ||
      !boardId
    ) {
      throw new HttpException(
        'Title or/and boardId, order field(s) was/were not found',
        HttpStatus.BAD_REQUEST
      );
    }
    return this.tasksService.create(
      {...createTaskDto, boardId}
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    const task = await this.tasksService.findOne(taskId, boardId);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Put(':taskId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    if (
      !taskId ||
      !boardId ||
      updateTaskDto.order === undefined
    ) {
      throw new HttpException('TaskId or/and BoardId, order was/were not found', HttpStatus.BAD_REQUEST);
    }
    const updatedTask = await this.tasksService.update(
      taskId, { ...updateTaskDto, boardId}
    );
    if (!updatedTask) {
      throw new HttpException('Task was not found',  HttpStatus.NOT_FOUND);
    }
    return updatedTask;
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    const board = await this.tasksService.findOne(taskId, boardId);
    if (!board) {
      throw new HttpException('Task was not found',  HttpStatus.NOT_FOUND);
    }
    await this.tasksService.removeOne(taskId, boardId);
  }
}
