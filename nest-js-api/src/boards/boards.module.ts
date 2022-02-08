import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import BoardsRepository from './boards.repository';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardsRepository]), TasksModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [TypeOrmModule]
})
export class BoardsModule {}
