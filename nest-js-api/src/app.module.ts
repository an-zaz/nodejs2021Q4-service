import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Board } from './boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env'
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 6000,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Task, Board],
    synchronize: false,
    migrations: ['migration/*.js'],
    cli: {
      migrationsDir: 'migration',
    },
  }), UsersModule, BoardsModule, TasksModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
