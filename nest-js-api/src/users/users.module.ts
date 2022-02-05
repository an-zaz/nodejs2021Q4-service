import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import UserRepository from './users.repository';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), TasksModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
